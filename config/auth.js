module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.render('404');
  }
};
