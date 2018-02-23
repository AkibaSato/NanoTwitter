var User = require('../models/user');

module.exports.register = function (req, res, next) {
  var body = req.body.user;
  var user = new User({
    username: body.username,
    fname: body.fname,
    lname: body.lname,
    password: body.password});
    user.save(function(err) { console.log(err) });
    res.send("NOT YET IMPLEMENTED");
  };

module.exports.follow = function (req, res, next) {
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getRegister = function (req, res, next) {
  res.render('signup');
};

module.exports.getUser = function (req, res, next) {
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getTweets = function (req, res, next) {
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getFollowees = function (req, res, next) {
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getFollowers = function (req, res, next) {
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getFolloweeTweets = function (req, res, next) {
  res.send("NOT YET IMPLEMENTED");
};
