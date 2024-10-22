package com.example.sync;

import com.example.sync.dto.ProductDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.transaction.TransactionManagerCustomizers;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.support.TransactionOperations;
import org.springframework.transaction.support.TransactionTemplate;

@Slf4j
@SpringBootApplication
public class SyncApplication {

	public static void main(String[] args) {
		SpringApplication.run(SyncApplication.class, args);
	}

	/**
	 * Since Spring Boot does not configure a transaction manager if it detects one already present, we must configure the JPA transaction manager ourselves:
	 * https://spring.io/blog/2023/10/04/synchronizing-with-external-transaction-managers-in-spring-cloud-stream
	 * https://piotrminkowski.com/2022/10/29/kafka-transactions-with-spring-boot/
	 *
	 * @param transactionManagerCustomizers
	 * @return
	 */
	@Bean
	public PlatformTransactionManager transactionManager(
					ObjectProvider<TransactionManagerCustomizers> transactionManagerCustomizers) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManagerCustomizers.ifAvailable((customizers) -> customizers.customize((TransactionManager) transactionManager));
		return transactionManager;
	}

	@Bean
	public TransactionTemplate transactionTemplate(PlatformTransactionManager transactionManager) {
		return new TransactionTemplate(transactionManager);
	}

	@Bean
	public NewTopic topic_product_details() {
		return TopicBuilder.name("product_details")
						.partitions(10)
						.replicas(1)
						.build();
	}

	@KafkaListener(id = "product", topics = "product_details")
	public void listen1(ProductDto dto) {
		log.info("Received: " + dto);
	}

}
