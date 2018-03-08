var Hashtag = require('../models/hashtag');
var Mention = require('../models/mention');
var Relationship = require('../models/relationship');
var User = require('../models/user');
var Tweet = require('../models').Tweet;

module.exports.tweet = function (req, res, next) {
  // var tweet = new Tweet({
  //   content: req.body.content,
  //   user: req.user._id,
  //   parent: req.body.parent,
  //   createdAt: req.body.timestamp
  // });
  //
  // tweet.save(function(err, savedTweet) {
  //   User.findOne({_id: req.user._id}, function (err, user) {
  //     if (err) {
  //       res.status(404).send(err);
  //       return;
  //     }
  //     user.tweets.push(savedTweet._id)
  //     res.send("NOT YET IMPLEMENTED");
  //   });
  // });
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getTweet = function (req, res, next) {
  // Tweet.findOne({_id: req.params.id}, function (err, tweet) {
  //   if (err) {
  //     res.status(404).send(err);
  //     return;
  //   }
  //   res.send("NOT YET IMPLEMENTED");
  // });
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getAll=function(req, res, next) {
  tweets=[];
  Tweet.findAll({
    attributes: ['id']
  }).then(function (tweets) {
    tweets=tweets
  }).catch(function(err) {
      console.log(err)
  });
  return tweets;
};

module.exports.getAllCount=function(req, res, next) {
  return this.getAll().length
}
module.exports.destroyAll=function(req, res, next) {
  Tweet.destroy({where: {
    id: req.id
  }}).then(function () {});
}
