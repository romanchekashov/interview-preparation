CREATE TABLE flights (
    id BIGINT PRIMARY KEY,
    number VARCHAR(255),
    departure_time TIMESTAMP,
    capacity INTEGER,
    version BIGINT DEFAULT 0
);

CREATE SEQUENCE ticket_id_seq START 1 INCREMENT 1;

CREATE TABLE tickets (
    id BIGINT PRIMARY KEY DEFAULT NEXTVAL('ticket_id_seq'),
    flight_id BIGINT REFERENCES flights(id),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);
