const pg = require('pg');
const config = require('../config');
const validator = require('validator');
const connectionString = config.db;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config').jwtSecret;
const salt = bcrypt.genSaltSync(10);
const _ = require('lodash');

//find user by id

//find user by username or email

module.exports.updateLastseenAndReturnToken = function(user) {
    return new Promise(function (resolve, reject) {
        const client = new pg.Client(connectionString);
        client.connect();
        const query = "UPDATE users SET lastseen=CURRENT_TIMESTAMP WHERE id=($1) RETURNING *";
        client.query(query, [user.id], function(err, result){
            client.end();

            if (err) {
                return reject({
                    success: false,
                    message: err
                })
            } else {
                try {
                    let token = jwt.sign(result.rows[0], jwtSecret, {expiresIn: 60 * 60 * 24 * 1000});
                    return resolve({
                        success: true,
                        message: 'User authenticated',
                        user: _.omit(result.rows[0], ['password']),
                        token: token
                    });
                } catch(error) {
                    return reject({
                        success: false,
                        message: error
                    })
                }
            }
        })
    })
}

module.exports.signUp = function(newUser) {
    return new Promise(function (resolve, reject) {
        const client = new pg.Client(connectionString);
        client.connect();
        const hashedPass = bcrypt.hashSync(newUser.password, salt);
        const query = 'INSERT INTO users (username, firstName, lastName, email, provider, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'
        client.query(query, [newUser.username, newUser.firstName, newUser.lastName, newUser.email, 'local', hashedPass], function(err, result) {
            client.end();
                if (err) {
                    return reject({
                        success: false,
                        message: err
                    })
                }
                let token = jwt.sign(result.rows[0], jwtSecret, {expiresIn: 60 * 60 * 24});
                return resolve({
                    success: true,
                    message: 'Account created',
                    user: _.omit(result.rows[0], ['password']),
                    token: token
                });   
        });    
    });
}

module.exports.findUserById = function(userId, cb) {
        const client = new pg.Client(connectionString);

        const query = "SELECT * FROM users WHERE id=($1)";
        client.connect();
        client.query(query, [userId], function(err, result){
            client.end();

            cb(err, result ? result.rows[0]: null);
        })
}