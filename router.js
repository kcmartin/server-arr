const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// middleware / helper
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  // dummy route for root route
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signup', Authentication.signup);
}
