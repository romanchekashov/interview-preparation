CREATE SEQUENCE sellers_id_seq START 1 INCREMENT 1;
CREATE TABLE sellers (
    id BIGINT PRIMARY KEY DEFAULT NEXTVAL('sellers_id_seq'),
    inn BIGINT,
    name VARCHAR(255)
);

CREATE SEQUENCE shops_id_seq START 1 INCREMENT 1;
CREATE TABLE shops (
    id BIGINT PRIMARY KEY DEFAULT NEXTVAL('shops_id_seq'),
    name VARCHAR(255),
    synced BOOLEAN DEFAULT FALSE
);

CREATE SEQUENCE products_id_seq START 1 INCREMENT 1;
CREATE TABLE products (
    id BIGINT PRIMARY KEY DEFAULT NEXTVAL('products_id_seq'),
    name VARCHAR(255),
    seller_id BIGINT REFERENCES sellers(id),
    shop_id BIGINT REFERENCES shops(id),
    synced BOOLEAN DEFAULT FALSE
);
