package com.example.circuitbreaker;

import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class ExternalService {

  public static final String FALLBACK_RESPONSE = "Fallback response: External service is currently unavailable.";
  public static final String FALLBACK_RATE_LIMIT_RESPONSE = "Fallback response: Too many requests. Please try again later.";
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

  @RateLimiter(name = "externalServiceRateLimiter", fallbackMethod = "rateLimitFallback")
  public String callExternalServiceWithRateLimiter() {
    return "Success";
//    return restTemplate.getForObject(externalServiceUrl, String.class);
  }

  // Fallback method
  public String fallback(Exception ex) {
    log.warn("Fallback method called", ex);
    return FALLBACK_RESPONSE;
  }

  public String rateLimitFallback(Throwable t) {
    log.warn("Rate limit fallback method called", t);
    return FALLBACK_RATE_LIMIT_RESPONSE;
  }

}
