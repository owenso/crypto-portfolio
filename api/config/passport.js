const passport = require('passport');
const User = require('../models/User');

module.exports = function() {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findUserById(id, function(err, user){

            console.log(err);
            console.log(user);

            done(err, user);
        })
    });

    // require('./strategies/local.js')();
    // require('./strategies/facebook.js')();
    // require('./strategies/google.js')();
    // require('./strategies/facebook-token.js')();
};