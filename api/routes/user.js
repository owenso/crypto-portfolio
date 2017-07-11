const User = require('../models/User');

module.exports.signUp = function(req, res, next) {
    User.signUp(req.body).then(function(data) {
        res.status(200).json(data);
    }).catch(function(error) {
        res.status(500).data(error);
    });
}


module.exports.signIn = function (req, res, next) {
    User.updateLastseenAndReturnToken(req.user).then(function(data) {
        res.status(200).json(data);
    }).catch(function(error) {
        res.status(500).send(error);
    });
};