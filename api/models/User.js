const pg = require('pg');
const config = require('../config');
const validator = require('validator');
const connectionString = config.db;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config').jwtSecret;
const salt = bcrypt.genSaltSync(10);

//find user by id

//find user by username or email

module.exports.updateLastseenAndReturnToken = function(user) {
    return new Promise(function (resolve, reject) {
        const client = new pg.Client(connectionString);

        const query = "UPDATE users SET lastseen=CURRENT_TIMESTAMP WHERE id=($1)";
        client.query(query, [user.id], function(err, result){
            client.end();

            if (err) {
                reject(err);
            } else {
                try {
                    let token = jwt.sign(user, jwtSecret, {expiresIn: 60 * 60 * 24 * 1000});
                    resolve({
                        success: true,
                        message: 'User authenticated',
                        user: _.omit(user, ['password']),
                        token: token
                    });
                } catch(err) {
                    reject({
                        success: false,
                        message: err
                    })
                }
            }
        })
    })
}

module.exports.signUp = function(newUser) {
    return new Promise(function (resolve, reject) {

        const hashedPass = bcrypt.hashSync(req.body.password, salt);
        const query = 'INSERT INTO users (firstName, lastName, email, provider, password) '
        client.query(query, [req.body.username, req.body.lastName, req.body.email, 'local', hashedPass], function(err, result) {

                if (err) {
                    console.log(err)
                    reject({
                        success: false,
                        message: err
                    })
                }

                let token = jwt.sign(result.recordset[0], jwtSecret, {expiresIn: 60 * 60 * 24});
                resolve({
                    success: true,
                    message: 'Account created',
                    user: _.omit(result.recordset[0], ['password']),
                    token: token
                });   
        });    
    });
}

module.exports.findUserById = function(user) {
        const client = new pg.Client(connectionString);

        const query = "SELECT * FROM users WHERE id=($1)";
        client.query(query, [user.id], function(err, result){
            client.end();

            if (err) {
                throw err;
            } else {
                return result.recordset[0];
            }
        })
}