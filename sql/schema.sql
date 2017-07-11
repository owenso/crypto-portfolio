DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS cryptos CASCADE;
DROP TABLE IF EXISTS wallets CASCADE;
DROP TABLE IF EXISTS portfolioEntry CASCADE;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE,
	firstname VARCHAR(50),
	lastname VARCHAR(50),
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE,
    provider VARCHAR(50),
    created TIMESTAMP DEFAULT current_timestamp,
    updated TIMESTAMP DEFAULT current_timestamp,
    lastseen TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE cryptos(
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) UNIQUE,
    name VARCHAR(255),
    created TIMESTAMP DEFAULT current_timestamp,
    updated TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE wallets(
	id SERIAL PRIMARY KEY,
	userID INTEGER REFERENCES users NOT NULL,
    walletType INTEGER REFERENCES cryptos NOT NULL,
    address VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT current_timestamp,
    updated TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE portfolioEntry(
	id SERIAL PRIMARY KEY,
	userID INTEGER REFERENCES users NOT NULL,
    price NUMERIC(10, 5),
    address VARCHAR(255) NOT NULL,
    purchaseDate TIMESTAMP NOT NULL,
    qty INT NOT NULL,
    crypto INTEGER REFERENCES cryptos NOT NULL,
    created TIMESTAMP DEFAULT current_timestamp,
    updated TIMESTAMP DEFAULT current_timestamp
);



