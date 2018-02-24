var User = require('../models/user');

module.exports.follow = function (req, res, next) {
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getSignup = function (req, res, next) {
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
