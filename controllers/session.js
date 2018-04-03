module.exports.getLogin = function (req, res, next) {
  res.render('login');
};

module.exports.logout = function (req, res, next) {
  req.logout();
  res.redirect('/');
};
