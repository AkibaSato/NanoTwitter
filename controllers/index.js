const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');

module.exports.index = function (req, res, next) {
  let followingCount = req.user.followees.length;
  let followerCount = req.user.followers.length;

  res.render('index', {
        title: 'List of Tweets',
        tweets: tweets,
        page: page + 1,
        tweetCount: tweetCount,
        pagination: pagination,
        followerCount: followerCount,
        followingCount: followingCount,
        pages: Math.ceil(pageViews / perPage),
      });
};
