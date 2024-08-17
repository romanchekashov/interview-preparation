2 Phase Commit (2PC) / XA Protocol / Distributed Transactions
================================

```shell
docker-compose up --build -d  # Start MySQL and PostgreSQL in Docker
docker-compose down           # Stop
```

```shell
POST: http://localhost:8080/money/transfer
BODY: {
  "userId": 1,
  "orderId": 1,
  "amount": 1.99
}
```

### References
- https://medium.com/@ygnhmt/distrubuted-transactions-springboot-3-atomikos-a5adfcba2c41
- [xa-demo](https://github.com/ahmetuygun/xa-demo)
- [Spring Boot Atomikos JTA Example with Postgresql](https://github.com/kloia/atomikos-spring)
- https://github.com/snowdrop/narayana-spring-boot
- https://www.atomikos.com/Blog/ExtremeTransactions6dot0
- [Atomikos: exception when transaction contains more than one persist](https://stackoverflow.com/questions/36912251/atomikos-exception-when-transaction-contains-more-than-one-persist)
- [Known Problems: MySQL_XA_bug](https://www.atomikos.com/Documentation/KnownProblems#MySQL_XA_bug)
- https://dev.mysql.com/doc/connector-j/en/connector-j-connp-props-high-availability-and-clustering.html
