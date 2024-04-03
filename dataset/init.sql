CREATE TABLE eggs (
    name TEXT,
    year INT,
    value TEXT
);

CREATE TABLE users (
    id INT,
    name TEXT,
    brand TEXT,
    price NUMERIC
);

CREATE TABLE products (
    id INT,
    name TEXT,
    company TEXT,
    wallet NUMERIC
);

COPY eggs
FROM '/docker-entrypoint-initdb.d/eggs.csv'
DELIMITER ','
CSV HEADER;

COPY users
FROM '/docker-entrypoint-initdb.d/users.csv'
DELIMITER ','
CSV HEADER;

COPY products
FROM '/docker-entrypoint-initdb.d/products.csv'
DELIMITER ','
CSV HEADER;