package com.example.sync.service;

import com.example.sync.dto.ProductDto;
import com.example.sync.entity.ProductEntity;
import com.example.sync.entity.ShopEntity;
import com.example.sync.repo.ProductRepository;
import com.example.sync.repo.ShopRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.data.util.Pair;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class SyncServiceImpl implements SyncService {

  private final SellerRestClient restClient;
  private final ShopRepository shopRepository;
  private final ProductRepository productRepository;
  private final KafkaTemplate<String, ProductDto> kafkaTemplate;
  private final ApplicationContext applicationContext;
  private final TransactionTemplate transactionTemplate;

  public SyncServiceImpl(SellerRestClient restClient,
                         ShopRepository shopRepository,
                         ProductRepository productRepository,
                         KafkaTemplate<String, ProductDto> kafkaTemplate,
                         ApplicationContext applicationContext,
                         TransactionTemplate transactionTemplate) {
    this.restClient = restClient;
    this.shopRepository = shopRepository;
    this.productRepository = productRepository;
    this.kafkaTemplate = kafkaTemplate;
    this.applicationContext = applicationContext;
    this.transactionTemplate = transactionTemplate;
  }

  /**
   * without @Transactional: org.hibernate.LazyInitializationException:
   * failed to lazily initialize a collection of role: com.example.sync.entity.ShopEntity.products: could not initialize proxy - no Session
   * 	at org.hibernate.collection.spi.AbstractPersistentCollection.throwLazyInitializationException(AbstractPersistentCollection.java:636)
   * 	at org.hibernate.collection.spi.AbstractPersistentCollection.withTemporarySessionIfNeeded(AbstractPersistentCollection.java:219)
   * 	at org.hibernate.collection.spi.AbstractPersistentCollection.readSize(AbstractPersistentCollection.java:150)
   * 	at org.hibernate.collection.spi.PersistentBag.size(PersistentBag.java:353)
   *
   * The org.hibernate.LazyInitializationException occurs when a lazy-loaded collection is accessed outside of an active Hibernate session.
   * To resolve this, you can use the @Transactional annotation to ensure that the session is active when accessing the collection.
   * By adding @Transactional(readOnly = true) to the syncShops method,
   * you ensure that the Hibernate session is active when accessing the products collection of ShopEntity.
   *
   * @return
   */
  @Transactional(value = "transactionManager", readOnly = true)
  @Override
  public List<Long> syncShops() {
    var syncedShopIds = new ArrayList<Long>();

    for (ShopEntity shop : shopRepository.findAllBySynced(false)) {
      try {
        // Self-inject to call syncShop
        SyncServiceImpl self = applicationContext.getBean(SyncServiceImpl.class);
        self.syncShop(shop);

//        transactionTemplate.executeWithoutResult(ts -> {
//          // do tx stuff
//          syncShop(shop);
//        });

        syncedShopIds.add(shop.getId());
      } catch (Exception e) {
        log.error("Failed to sync shop {} {}", shop.getId(), e.getMessage());
        e.printStackTrace();
      }
    }
    return syncedShopIds;
  }

  /**
   * without correct transaction propagation: org.springframework.transaction.UnexpectedRollbackException:
   * Transaction rolled back because it has been marked as rollback-only
   *
   * by default, the transaction propagation is REQUIRED, which use the existing transaction if it exists, otherwise create a new one.
   * if exception occurs, the transaction is marked as rollback-only, and the exception is propagated to the caller.
   * because caller transaction rollback, the nested transaction also rollback.
   * Even catch the exception, the transaction is still marked as rollback-only and no more work could be done!
   *
   * To solve this, we need to use REQUIRES_NEW propagation, which always create a new transaction.
   * REQUIRES_NEW creates a new transaction, and suspends the current transaction if it exists.
   * If exception occurs, the transaction is marked as rollback-only, but the caller transaction is not affected.
   * The nested transaction is rolled back, but the caller transaction is still active.
   *
   * https://stackoverflow.com/questions/19349898/unexpectedrollbackexception-transaction-rolled-back-because-it-has-been-marked
   * https://stackoverflow.com/questions/19302196/transaction-marked-as-rollback-only-how-do-i-find-the-cause/19312020#19312020
   *
   * @param shop
   * @return
   */
  @Transactional(value = "transactionManager", propagation = Propagation.REQUIRES_NEW)
  @Override
  public void syncShop(ShopEntity shop) {
    log.info("Try sync shop {}", shop.getId());
    boolean lockAcquired = shopRepository.tryAdvisoryLock(shop.getId());
    if (!lockAcquired) {
      log.info("Shop {} is already being processed by another instance.", shop.getId());
      throw new RuntimeException("Shop" + shop.getId() + "is already being processed by another instance.");
    }

    try {
      log.info("Syncing shop {}", shop.getId());
      // TODO: better fetch only unsynced products
      var products = shop.getProducts()
              .stream()
              .filter(p -> !p.isSynced())
              .toList();
      batchSyncProducts(products, 10);
      shop.setSynced(true);
      shopRepository.save(shop);
    } finally {
        shopRepository.releaseAdvisoryLock(shop.getId());
    }
  }

  protected void batchSyncProducts(List<ProductEntity> products, int batchSize) {
    SyncServiceImpl self = applicationContext.getBean(SyncServiceImpl.class);
    for (int i = 0; i < products.size(); i += batchSize) {
      List<ProductEntity> batch = products.subList(i, Math.min(i + batchSize, products.size()));
      var productAndSellerDetails = batch
              .parallelStream()
              .map(product -> {
                var seller = product.getSeller();
                String sellerDetails = null;
                try {
                  sellerDetails = restClient.getLegalDetails(seller.getInn());
                } catch (RuntimeException e) {
                  log.error("Failed to get seller details for {}", seller.getInn(), e);
                }
                return Pair.of(product, sellerDetails);
              })
              .filter(p -> p.getSecond() != null)
              .toList();

//      transactionTemplate.executeWithoutResult(ts -> {
//        // do tx stuff
//        syncProducts(productAndSellerDetails);
//      });
      self.syncProducts(productAndSellerDetails);
    }
  }

  @Transactional(value = "transactionManager", propagation = Propagation.REQUIRES_NEW)
  protected void syncProducts(List<Pair<ProductEntity, String>> productAndSellerDetails) {
    int i = productAndSellerDetails.size();
    var dtoList = new ArrayList<ProductDto>(productAndSellerDetails.size());

    for (var p: productAndSellerDetails) {
      var product = p.getFirst();
      var sellerDetails = p.getSecond();
      log.info("Syncing product {}", product.getId());

      var dto = new ProductDto();
  //    dto.setProduct(product);
      dto.setId(product.getId());
      dto.setName(product.getName());
      dto.setSellerDetails(sellerDetails);
      dtoList.add(dto);

      kafkaTemplate.send("product_details", "product", dto); // topic, key, value
//      if (--i == 0) {
//        throw new RuntimeException("Simulated error");
//      }

      product.setSynced(true);
      productRepository.save(product);
    }

//    kafkaTemplate.executeInTransaction(template -> {
//      for (var dto: dtoList) {
//        template.send("product_details", "product", dto);
//      }
//      throw new RuntimeException("Simulated error");
////      return null;
//    });
  }
}
