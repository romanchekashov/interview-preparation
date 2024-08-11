### Reliability cloud patterns with Resilience4j library

#### Description
Resilience4j is a lightweight fault tolerance library inspired by Netflix Hystrix, but designed for functional programming. It is a lightweight fault tolerance library designed for Java 8 and functional programming. Resilience4j provides higher-order functions (decorators) to enhance any functional interface, lambda expression or method reference with a Circuit Breaker, Rate Limiter, Retry or Bulkhead.

### Circuit Breaker Pattern

#### Description
The Circuit Breaker pattern is a design pattern used in modern software development. It is used to detect failures and encapsulates the logic of preventing a failure from constantly recurring, during maintenance, temporary external system failure or unexpected system difficulties. The Circuit Breaker pattern also enables an application to detect whether the fault has been fixed. If the fault is fixed, the application will try to close the circuit and resume normal operation.


REST-api: http://localhost:3000/api/data?reliabilityPattern=circuit-breaker

```shell
mvn test -Dtest=ExternalServiceIntegrationTest#testCircuitBreakerWithFallbackOpenAndHalfOpenAndClosedState
```

#### Reference Documentation
- https://resilience4j.readme.io/docs/getting-started-3
- https://spring.io/projects/spring-cloud-circuitbreaker
- https://spring.io/guides/gs/cloud-circuit-breaker
- https://www.baeldung.com/spring-cloud-circuit-breaker
- https://habr.com/ru/articles/793550/
- https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
- https://learn.microsoft.com/ru-ru/azure/architecture/patterns/circuit-breaker

### Rate Limiter Pattern

#### Description
The Rate Limiter pattern is a design pattern used in modern software development. It is used to control the rate of requests sent to a service. The Rate Limiter pattern is used to prevent a service from being overwhelmed by too many requests. The Rate Limiter pattern is used to control the rate of requests sent to a service.

REST-api: http://localhost:3000/api/data?reliabilityPattern=rate-limiter

```shell
mvn test -Dtest=ExternalServiceIntegrationTest#testRateLimiter
```

#### Reference Documentation
- https://resilience4j.readme.io/docs/getting-started-3
- https://habr.com/ru/articles/793550/
- https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern
- https://learn.microsoft.com/ru-ru/azure/architecture/patterns/rate-limiting-pattern

### Bulkhead Pattern

#### Description
The Bulkhead pattern is a design pattern used in modern software development. It is used to prevent a failure in one part of the system from affecting the entire system. The Bulkhead pattern is used to isolate failures and ensure that the system continues to function properly. The Bulkhead pattern is used to prevent a failure in one part of the system from affecting the entire system. The Bulkhead pattern is used to isolate failures and ensure that the system continues to function properly.

> **Hint:** `@Bulkhead` will work only if dependency https://mvnrepository.com/artifact/io.github.resilience4j/resilience4j-bulkhead will be added to `pom.xml`!

REST-api: http://localhost:3000/api/data?reliabilityPattern=bulkhead

```shell
mvn test -Dtest=ExternalServiceIntegrationTest#testBulkhead
```

#### Reference Documentation
- https://resilience4j.readme.io/docs/getting-started-3
- https://habr.com/ru/articles/793550/
- https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead
- https://learn.microsoft.com/ru-ru/azure/architecture/patterns/bulkhead
- https://mvnrepository.com/artifact/io.github.resilience4j
- https://docs.spring.io/spring-cloud-circuitbreaker/reference/spring-cloud-circuitbreaker-resilience4j/bulkhead-pattern-supporting.html
