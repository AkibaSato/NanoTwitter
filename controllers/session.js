module.exports.getLogin = (req, res, next) => {
  res.render('login');
};

module.exports.logout = (req, res, next) => {
  req.logout();
  // res.render('index');
  req.flash('success', 'You are logged out.');
  res.redirect('/');
};
