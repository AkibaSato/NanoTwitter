var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service

var axios = require('axios')

module.exports.index = async (req, res) => {
  try {
    var timeline
    var user
    if (req.user) {
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

    } else {
      // If you are not, you see the most recent tweets from randos.
       timeline = await axios.get(tweetServiceURL + '/timeline/global', {});
    }

    res.render('index', {
      me: req.user, user: req.user, tweets: timeline.data, API_TOKEN: req.API_TOKEN
    })
    // res.json({});
  } catch (err) {
    res.status(404).send(err)
  }
};
