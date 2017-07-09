const pg = require('pg');
const config = require('../config');
const validator = require('validator');
const connectionString = process.env.DATABASE_URL || config.db;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config').jwtSecret;
const salt = bcrypt.genSaltSync(10);

//find user by id

//find user by username or email

module.exports.loginWithUsernameOrEmail = function(req, username, password, done) {
    const client = new pg.Client(connectionString);
    client.connect();
    if (validator.isEmail(username)) {
        console.log('email detected')
        client.query('SELECT * FROM users WHERE email = $1::text', [username], handleQuery(err, res, 'email'));
    } else {
        console.log('defaulting to username')
        client.query('SELECT * FROM users WHERE username = $1::text', [username], handleQuery(err, res, 'username'));
    }

    function handleQuery(err, res, type) {
         console.log(res);
            if (!res.recordset.length) {
                return req.res.status(400).json({
                    success: false,
                    message: type === 'email' ? 'No user was found with that email' : 'No user was found with that username'
                });
            }

            if (!bcrypt.compareSync(password, res.recordset[0].password)){
                return req.res.status(401).json({
                    success: false,
                    message: 'Incorrect password'
                });            
            }

            let token = jwt.sign(res.recordset[0], jwtSecret, {expiresIn: 60 * 60 * 24});
            return req.res.json({
                success: true,
                message: 'User authenticated',
                user: _.omit(res.recordset[0], ['password']),
                token: token
            });
        client.end();
    }
}

module.exports.signUp = function(req, res, next) {
    const newUser = req.body;
    const hashedPass = bcrypt.hashSync(req.body.password, salt);

    client.query('INSERT INTO users (firstName, lastName, email, provider, password) ', [req.body.username, req.body.lastName, req.body.email, 'local', hashedPass], function(err, res) {

            if (err) {
                console.log(err)
                return req.res.status(200).json({
                    success: false,
                    message: err
                })
            }

            let token = jwt.sign(result.recordset[0], jwtSecret, {expiresIn: 60 * 60 * 24});
            return req.res.status(200).json({
                success: true,
                message: 'Account created',
                user: _.omit(result.recordset[0], ['Password']),
                token: token
            });   
    });    
}