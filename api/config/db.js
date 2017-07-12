const pg = require('pg');
const config = require('../config');
const connectionString = config.db;


//TEST CONNECTION
module.exports = function() {
    const client = new pg.Client(connectionString)
    client.connect()

    client.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res.rows[0])
            console.log(`Connection to ${connectionString} successful!`)
        }
    client.end()
    })

}