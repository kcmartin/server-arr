module.exports = function(app) {
  // first argument is route, then run function
  app.get('/', function(req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
  });
}
