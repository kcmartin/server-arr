const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub is short for subject - jwt
  // iat is issued at time - jwt
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // user has already had email/pw auth'ed
  // we need to just give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  // pull email and password off request body
  const email = req.body.email;
  const password = req.body.password;

  // Check that user is entering both an email and password
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password '});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with the email DOES exist return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with the email DOES NOT exist, create and save user
    const user = new User({
      email: email,
      password: password
    });

    // now save record to db
    user.save(function(err) {
      if (err) { return next(err); }

    // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
