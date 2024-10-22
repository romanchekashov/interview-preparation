package com.example.sync.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class SellerRestClient {

  public String getLegalDetails(Long inn) {
    try {
      TimeUnit.SECONDS.sleep(10);
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }
    return "Legal-" + inn;
  }
}
