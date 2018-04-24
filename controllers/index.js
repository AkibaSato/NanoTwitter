var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service
// var async=require('async')
var axios = require('axios')
var redis = require('../config/redis')
// var REDIS_PORT = process.env.REDISCLOUD_URL || process.env.REDIS_PORT;
// var client = redis.createClient(REDIS_PORT);

module.exports.index = async (req, res) => {
  try {
  var timeline
  var user
  var callback
  console.log()
  if (req.user) {
    var key = 'userHomeHTML:' + req.user.id
    var html = await redis.getAsync(key);

    if (html) {
      return res.send(html)
    }

    var getUser = axios.get(userServiceURL + '/user', {
      data: { id: req.user.id }
    });

    // If you are logged in, you see tweets from the people you follow.
    var getTimeline = axios.get(tweetServiceURL + '/timeline/followees', {
      data: { id: req.user.id }
    });

    var [userData, timelineData] = await axios.all([getUser, getTimeline]);

    req.user = userData.data
    timeline = timelineData

    callback = (err, html) => {
      redis.set('userHomeHTML:' + req.user.id, html, 'EX', 60);
      res.send(html);
     }

  } else {
    var key = 'globalHomeHTML'
    var html = await redis.getAsync(key);

    if (html) {
      return res.send(html)
    }

    // If you are not, you see the most recent tweets from randos.
     timeline = await axios.get(tweetServiceURL + '/timeline/global', {});

     callback = (err, html) => {
       redis.set('globalHomeHTML', html, 'EX', 60);
       res.send(html);
     }

  }

  res.render('index', {
    me: req.user, user: req.user, tweets: timeline.data }, callback)

} catch (err) {
  console.log(err)
}
};
