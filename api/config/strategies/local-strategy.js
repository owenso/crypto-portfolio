const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/User'),
    pg = require('pg'),
    config = require('../../config')
    validator = require('validator')
    bcrypt = require('bcryptjs')

module.exports = function() {
    passport.use(new LocalStrategy({
        passReqToCallback: true,
        session:false
    },
    function(req, username, password, done) {
        const client = new pg.Client(config.db);
        client.connect();
        if (validator.isEmail(username)) {
            console.log('email detected')
            client.query('SELECT * FROM users WHERE email = ($1)', [username], (err, result) => {handleQuery(err, result, 'email', done, client, password, req)});
        } else {
            console.log('defaulting to username')
            client.query('SELECT * FROM users WHERE username = ($1)', [username], (err, result) => {handleQuery(err, result, 'username', done, client, password, req)});
        }
    }));
}

function handleQuery(err, result, type, done, client, password, req) {
        client.end();
        if (err) {
            return req.res.status(500).json({
                sucess:false,
                nessage: err
            });
        }

        if (!result.rows.length) {
            return req.res.status(401).json({
                sucess:false,
                message: type === 'email' ? 'No user was found with that email' : 'No user was found with that username'
            });
        }

        if (!bcrypt.compareSync(password, result.rows[0].password)){
            return req.res.status(401).json({
                success:false,
                message: 'Incorrect password'
            });            
        }

        return done(null, result.rows[0]);

}