var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service
var axios = require('axios')
var redis = require('../config/redis')

module.exports.index = async (req, res) => {
  try {
    var timeline
    var user
    var callback

    if (req.user) {
      var html = await redis.getAsync('userhomeHTML:' + req.user.id);

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
        redis.set('userhomeHTML:' + req.user.id, html, 'EX', 60)
        res.send(html)
      }

    } else {
      var html = await redis.getAsync('homeHTML');

      if (html) {
        return res.send(html)
      }

      // If you are not, you see the most recent tweets from randos.
       timeline = await axios.get(tweetServiceURL + '/timeline/global', {});

       callback = (err, html) => {
         redis.set('homeHTML', html, 'EX', 60)
         res.send(html)
       }

    }

    console.log(req.user)

    res.render('index', {
      me: req.user, user: req.user, tweets: timeline.data }, callback)

  } catch (err) {
    console.log(err)
  }
};
