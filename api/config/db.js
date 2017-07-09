const pg = require('pg');
const config = require('../config');
const connectionString = process.env.DATABASE_URL || config.db;


//TEST CONNECTION
module.exports = function() {
    const client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Connection to ${connectionString} successful!`)
        }
        client.end();
    });

    // return client;
}