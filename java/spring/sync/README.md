sync example
---

### How to run:
```shell
docker compose up -d    # start
docker compose down -v  # stop and remove volumes
```

### References
- [stackoverflow: Transaction marked as rollback only: How do I find the cause](https://stackoverflow.com/questions/19302196/transaction-marked-as-rollback-only-how-do-i-find-the-cause/19312020#19312020)
- [stackoverflow: UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only](https://stackoverflow.com/questions/19349898/unexpectedrollbackexception-transaction-rolled-back-because-it-has-been-marked)
- [Piotr's TechBlog: Kafka Transactions with Spring Boot](https://piotrminkowski.com/2022/10/29/kafka-transactions-with-spring-boot/)
- [GitHub: spring-kafka samples](https://github.com/spring-projects/spring-kafka/tree/main/samples)
- [Spring Kafka Transactions](https://docs.spring.io/spring-kafka/reference/kafka/transactions.html)
- [Synchronizing with External Transaction Managers in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/10/04/synchronizing-with-external-transaction-managers-in-spring-cloud-stream)
- [stackoverflow: Wrapping StreamBridge send and JPA save inside a transaction](https://stackoverflow.com/questions/68460690/wrapping-streambridge-send-and-jpa-save-inside-a-transaction)
- [stackoverflow: Spring Kafka The class is not in the trusted packages](https://stackoverflow.com/questions/51688924/spring-kafka-the-class-is-not-in-the-trusted-packages)
