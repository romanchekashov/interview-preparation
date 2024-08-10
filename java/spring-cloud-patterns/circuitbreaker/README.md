### Circuit Breaker


### Description
The Circuit Breaker pattern is a design pattern used in modern software development. It is used to detect failures and encapsulates the logic of preventing a failure from constantly recurring, during maintenance, temporary external system failure or unexpected system difficulties. The Circuit Breaker pattern also enables an application to detect whether the fault has been fixed. If the fault is fixed, the application will try to close the circuit and resume normal operation.


REST-api: http://localhost:3000/api/data

ExternalServiceIntegrationTest.java - test for external service
```shell
mvn test -Dtest=ExternalServiceIntegrationTest
```

### Reference Documentation
- https://resilience4j.readme.io/docs/getting-started-3
- https://spring.io/projects/spring-cloud-circuitbreaker
- https://spring.io/guides/gs/cloud-circuit-breaker
- https://www.baeldung.com/spring-cloud-circuit-breaker
- https://habr.com/ru/articles/793550/
- https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
- https://learn.microsoft.com/ru-ru/azure/architecture/patterns/circuit-breaker
