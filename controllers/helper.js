var models = require('../models');
var sequelize = require('sequelize');

// Gets the people who follow the user.
module.exports.getUserFollowers = (id) => {
  return models.Relationship.findAll({
    where: { followeeId: id },
    include: [{
      model: models.User,
      as: 'follower',
      attributes: ['id', 'username', 'fname', 'lname']
    }],
    attributes: ['createdAt']
  }).catch(err => {
    throw new Error("Error in retrieving followers for user.")
  });
}

// Gets the people whom the user follows.
module.exports.getUserFollowees = (id) => {
  return models.Relationship.findAll({
    where: { followerId: id },
    include: [{
      model: models.User,
      as: 'followee',
      attributes: ['id', 'username', 'fname', 'lname']
    }],
    attributes: ['createdAt']
  }).catch(err => {
    throw new Error("Error in retrieving followers for user.")
  });
}

// Gets the tweets from the user, excluding retweets.
module.exports.getUserOriginalTimeline = (id) => {
  return models.Tweet.findAll({
    where: { userId: id, originalId: null },
    attributes: ['id', 'content', 'createdAt']
  }).catch(err => {
    throw new Error('Error in retrieving user original tweets.')
  });
}

// Example return JSON:
// {
//  "name": "Bob Builder"
//  "username": "bob_builder",
// }
module.exports.getUserMetadata = (id) => {
  return models.User.findOne({
    where: { id: id },
  }).catch(err => {
    throw new Error('Error in retrieving user metadata.')
  });
}

// Get the tweets from the user, including retweets.
module.exports.getUserTimeline = (id) => {
  return models.Tweet.findAll({
    order: [['createdAt', 'DESC']],
    limit: 50,
    where: { userId: id },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username']
    }],
    attributes: ['id','content', 'createdAt']
  }).catch(err => {
    throw new Error('Error in retrieving user tweets.')
  });
}

// Get the most recent 50 tweets from the people that the user follows.
// TODO: Check Redis for home timeline of the user. If cache miss, use this query.
module.exports.getHomeTimeline = (id) => {
  console.log("Getting home timeline")
  return models.Tweet.findAll({
    order: [['createdAt', 'DESC']],
    limit: 50,
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username', 'fname', 'lname'],
      where: {
        id: {
          $in: sequelize.literal(
            `(SELECT  "followeeId" FROM "Relationships" WHERE "followerId"=${id})`)
        }
      }
    }],
    required: true,
    attributes: ['id', 'originalId', 'content', 'createdAt']
  }).catch(err => {
    throw new Error("Error in retrieving the home timeline for user")
  });
};

// Get the most recent
// TODO: Retrieve global timeline from Redis.
module.exports.getGlobalTimeline = () => {
  return models.Tweet.findAll({
    order: [['createdAt', 'DESC']],
    limit: 50,
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username', 'fname', 'lname']
    }],
    attributes: ['id', 'originalId', 'content', 'createdAt']
  }).catch(err => {
    throw new Error("Error in retrieving the global timeline")
  });
};
