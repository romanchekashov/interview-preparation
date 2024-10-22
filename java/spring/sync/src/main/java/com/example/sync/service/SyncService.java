package com.example.sync.service;

import com.example.sync.entity.ShopEntity;

import java.util.List;

public interface SyncService {
  List<Long> syncShops();

  void syncShop(ShopEntity shop);
}
