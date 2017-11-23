/**
 * Created by Thuan on 12/4/2016.
 */
var JwtStrategy = require('passport-jwt').Strategy;

var User = require('../user/user.object');
module.exports = function (passport) {
    var opts = {};
    opts.secretOrKey = 'flowers';
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        })
    }))
};