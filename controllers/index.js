const User = require('../models').User;
const Tweet = require('../models').Tweet;


module.exports.index = (req, res, next) => {
  // let followingCount = req.user.following.length;
  // let followerCount = req.user.followers.length;

  let followingCount = 0;
  let followerCount = 0;
  let tweets;

  Tweet.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'username', 'fname', 'lname']
    }],
    attributes: ['content', 'createdAt']
  }).then(result => {
    tweets = result;

    res.render('index', {
      req: req,
      userData: req.user,
      tweetCount: tweets.length,
      followingCount: followingCount,
      followerCount: followerCount,
      tweets: tweets,
      atIndex: true,
      currUser: false,
      test: 1
    });
  }).catch(function(err) {
    res.status(404).send(err);
  });




};
