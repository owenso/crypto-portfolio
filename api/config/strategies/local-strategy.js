const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/User'),
    pg = require('pg'),
    config = require('../../config')
    validator = require('validator')

module.exports = function() {
    passport.use(new LocalStrategy({
        // passReqToCallback: true,
        session:false
    },
    function(username, password, done) {
        const client = new pg.Client(config.db);
        client.connect();
        if (validator.isEmail(username)) {
            console.log('email detected')
            client.query('SELECT * FROM users WHERE email = ($1)', [username], handleQuery(err, result, 'email'));
        } else {
            console.log('defaulting to username')
            client.query('SELECT * FROM users WHERE username = ($1)', [username], handleQuery(err, result, 'username'));
        }
    }));
}

function handleQuery(err, result, type) {
        console.log(result);
        if (err) {
            return done(err);
        }

        if (!result.recordset.length) {
            return done(null, false, {
                message: type === 'email' ? 'No user was found with that email' : 'No user was found with that username'
            });
        }

        if (!bcrypt.compareSync(password, result.recordset[0].password)){
            return done(null, false, {
                message: 'Incorrect password'
            });            
        }

        return done(null, result.recordset[0]);

    client.end();
}