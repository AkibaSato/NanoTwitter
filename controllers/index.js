const models = require('../models')
const sequelize = require('sequelize')

// TODO: Check Redis for home timeline of the user. If cache miss, use this query.
function getHomeTimeline(id) {
  return models.Tweet.findAll({
    order: [['createdAt', 'DESC']],
    limit: 50,
    where: {
      id: {
        $in: sequelize.literal(
          `(SELECT  "followeeId" FROM "Relationships" WHERE "followerId"=${id})`)
      }
    },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username', 'fname', 'lname']
    }],
    attributes: ['content', 'createdAt']
  }).catch(err => {
    console.log(err)
    throw err
  });
};

// TODO: Retrieve global timeline from Redis.
function getGlobalTimeline() {
  console.log("hey")
  return models.Tweet.findAll({
    order: [['createdAt', 'DESC']],
    limit: 50,
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username', 'fname', 'lname']
    }],
    attributes: ['content', 'createdAt']
  }).catch(err => {
    console.log(err)
    throw err
  });
};

module.exports.index = (req, res, next) => {
  var getTimeline
  var isLoggedIn = req.isAuthenticated()
  if (isLoggedIn) {
    // If you are logged in, you see tweets from the people you follow.
    getTimeline = getHomeTimeline(req.user.id)
  } else {
    // If you are not, you see the most recent tweets from randos.
    getTimeline = getGlobalTimeline()
  }
  getTimeline.then(tweets => {
    console.log("here")
    res.render('index', {
      user: req.user,
      tweets: tweets,
    })
  }).catch(err => {
    res.status(404).send(err);
  })
};
