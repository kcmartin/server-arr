const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {

  });

  // If a user with the email DOES exist return an error

  // If a user with the email DOES NOT exist, create and save user

  // Respond to request indicating the user was created
}
