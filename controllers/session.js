module.exports.getLogin = function (req, res, next) {
  res.render('login');
};

module.exports.logout = (req, res, next) => {
  req.logout();
  // res.render('index');
  res.redirect('/');
};
