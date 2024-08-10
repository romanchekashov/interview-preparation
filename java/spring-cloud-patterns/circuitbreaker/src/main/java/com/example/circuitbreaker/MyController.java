package com.example.circuitbreaker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyController {

  private final ExternalService externalService;

  public MyController(ExternalService externalService) {
    this.externalService = externalService;
  }

  @GetMapping("/data")
  public String getData(@RequestParam("reliabilityPattern") String reliabilityPattern) {
    return switch (reliabilityPattern) {
        case "circuit-breaker" -> externalService.callExternalServiceWithCircuitBreaker();
        case "bulkhead" -> externalService.callExternalServiceWithBulkhead();
        default -> throw new IllegalArgumentException("Invalid reliability pattern: " + reliabilityPattern);
    };
  }
}
