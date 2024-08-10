package com.example.circuitbreaker;

import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class ExternalService {

  public static final String FALLBACK_RESPONSE = "Fallback response: External service is currently unavailable.";
  private final RestTemplate restTemplate;
  private final String externalServiceUrl;

  public ExternalService(RestTemplate restTemplate, @Value("${EXTERNAL_SERVICE_URL}") String externalServiceUrl) {
    this.restTemplate = restTemplate;
    this.externalServiceUrl = externalServiceUrl;
  }

  @CircuitBreaker(name = "externalServiceCircuitBreaker", fallbackMethod = "fallback")
  public String callExternalServiceWithCircuitBreaker() {
    return restTemplate.getForObject(externalServiceUrl, String.class);
  }

  @Bulkhead(name = "externalServiceBulkhead", fallbackMethod = "fallback")
  public String callExternalServiceWithBulkhead() {
    log.info("Calling external service with bulkhead {}", Thread.currentThread().getName());
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }
    return restTemplate.getForObject(externalServiceUrl, String.class);
  }

  // Fallback method
  public String fallback(Exception ex) {
    log.error("Fallback method called", ex);
    return FALLBACK_RESPONSE;
  }

}
