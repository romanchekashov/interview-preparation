GRANT XA_RECOVER_ADMIN ON *.* TO 'user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    balance DECIMAL(19, 4)
);

INSERT INTO users (name, balance) VALUES ('Alice', 1000.0);
