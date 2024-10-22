package com.example.sync.repo;

import com.example.sync.entity.ShopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShopRepository extends JpaRepository<ShopEntity, Long> {
  
  List<ShopEntity> findAllBySynced(boolean synced);

  @Query(value = "SELECT pg_try_advisory_lock(:shopId)", nativeQuery = true)
  boolean tryAdvisoryLock(@Param("shopId") Long shopId);

  @Query(value = "SELECT pg_advisory_unlock(:shopId)", nativeQuery = true)
  void releaseAdvisoryLock(@Param("shopId") Long shopId);
}
