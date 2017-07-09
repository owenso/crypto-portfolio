process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const express = require('./config/express');
const passport = require('./config/passport');
const poloniexAPI = require('./config/poloniexAPI');

const app = express();
passport();
poloniexAPI();

const port = process.env.PORT || 3001;


app.listen(port);
module.exports = app;

console.info('Server running on port: ' + port);