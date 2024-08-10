package com.example.circuitbreaker;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternalService {

  private final RestTemplate restTemplate;

  public ExternalService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @CircuitBreaker(name = "externalServiceCircuitBreaker", fallbackMethod = "fallback")
  public String callExternalService() {
    String url = "https://api.example.com/data";
    return restTemplate.getForObject(url, String.class);
  }

  // Fallback method
  public String fallback(Exception ex) {
    return "Fallback response: External service is currently unavailable.";
  }

}
