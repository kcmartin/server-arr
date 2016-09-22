const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// set up options for jwt strategy
const jwtOptions = {
  // look at authorization header to find token
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secret: config.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if the user id in the payload exists in DB
  // if so, call 'done' with that user
  // if not, call 'done' w/o a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use strategy
passport.use(jwtLogin);
