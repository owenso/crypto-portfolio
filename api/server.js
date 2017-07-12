process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const passport = require('./config/passport');
const express = require('./config/express');
const db = require ('./config/db');
const poloniexAPI = require('./lib/poloniexAPI');
const coinMarketCapAPI = require('./lib/coinMarketCapAPI');
const app = express();

db();
passport();
poloniexAPI();
coinMarketCapAPI();

const port = process.env.PORT || 3001;


app.listen(port);
module.exports = app;

console.info('Server running on port: ' + port);