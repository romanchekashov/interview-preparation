CREATE SEQUENCE order_id_seq START 1 INCREMENT 1;
CREATE TABLE orders (
    id BIGINT PRIMARY KEY DEFAULT nextval('order_id_seq'),
    product VARCHAR(255),
    amountPaid NUMERIC(19, 4)
);

INSERT INTO orders (product, amountPaid) VALUES ('Apple', 0);
