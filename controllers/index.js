const models = require('../models')
const sequelize = require('sequelize')
const helper = require('./helper')

module.exports.index = (req, res, next) => {
  var getTimeline
  if (req.user) {
    // If you are logged in, you see tweets from the people you follow.
    getTimeline = helper.getHomeTimeline(req.user.id)
  } else {
    // If you are not, you see the most recent tweets from randos.
    getTimeline = helper.getGlobalTimeline()
  }
  getTimeline.then(tweets => {
    res.render('index', {
      user: req.user,
      tweets: tweets,
    })
  }).catch(err => {
    res.status(404).send(err);
  })
};
