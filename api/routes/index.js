const user = require('./user');
const passport = require('passport');

const root = '/api/v1/';

module.exports = function(app) {

    app.route(root + 'signup')
        .post(user.signUp);

    app.route(root + 'signin')
        .post(passport.authenticate('local'), user.signIn);
}