var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service

var axios = require('axios')

module.exports.index = async (req, res) => {
  try {
    var timeline

    if (req.user) {
      // If you are logged in, you see tweets from the people you follow.
      timeline = await axios.get(tweetServiceURL + '/timeline/followees', {
        data: { id: req.user.id }
      });
    } else {
      // If you are not, you see the most recent tweets from randos.
      timeline = await axios.get(tweetServiceURL + '/timeline/global', {});
    }

    res.render('index', {
      me: req.user, user: req.user, tweets: timeline.data, original: false
    })
  } catch (err) {
    res.status(404).send(err)
  }
};
