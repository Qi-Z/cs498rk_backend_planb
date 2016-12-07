var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/darsuser');

/**
 * Specifies what strategy we'll use
 */
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'netid',
        passwordField : 'password',
            passReqToCallback: true
    },
    function(req, netid, password, done) {
        User.findOne({'netid' : netid}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( user ) {
                return done(null, false);
            } else {
                var newUser = new User();

                // newUser.email = netid;
                // newUser.password = newUser.generateHash(password);
                newUser.netid = netid;
                newUser.name = req.body.name;
                newUser.password = newUser.generateHash(password);
                newUser.graduationDate = req.body.graduationDate;
                newUser.classTaken = req.body.classTaken;
                newUser.classInProgress = req.body.classInProgress;
                newUser.classRegistered = req.body.classRegistered;
                newUser.save(function(err) {
                    return done(null, newUser);
                });
            }
            
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'netid',
        passwordField: 'password',
    },
    function(netid, password, done) {
        User.findOne({'netid': netid}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( !user || !user.validPassword(password) ) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));
};