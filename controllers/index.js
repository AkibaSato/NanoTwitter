const User = require('../models').User;
const Tweet = require('../models').Tweet;


module.exports.index = (req, res, next) => {
  res.render('index', {
    req: req,
    tweets: Tweet.all
  });
};
