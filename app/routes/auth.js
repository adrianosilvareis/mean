var passport = require('passport');

module.exports = function(app) {

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/'
  }));

  //  liberar as libs e bloquear back quando não logado
  app.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      // permite que outras rotas sejam processadas
      return next();
    } else {
      // renderiza auth.
      res.render("auth");
    }
  });

  app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
  });

};
