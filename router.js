const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// middleware / helper - signup
const requireAuth = passport.authenticate('jwt', { session: false });

// 2nd helper for local strategy - signin
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // dummy route for root route
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
