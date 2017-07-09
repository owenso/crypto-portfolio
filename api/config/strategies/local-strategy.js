const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/User');

module.exports = function() {
    passport.use(new LocalStrategy({
        passReqToCallback: true,
        session:false
    },
    User.loginWithUsernameOrEmail));
