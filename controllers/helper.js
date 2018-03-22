var models = require('../models');
var sequelize = require('sequelize');

module.exports.getUserFollowers = (id) => {
  return models.Relationship.findAll({
    where: { followeeId: parseInt(id) },
    include: [{
      model: models.User,
      as: 'follower',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).catch(function(err) {
    throw new Error("Error in retrieving followers for user.")
  });
}

module.exports.getUserFollowees = (id) => {
  return models.Relationship.findAll({
    where: { followerId: parseInt(id) },
    include: [{
      model: models.User,
      as: 'followee',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).catch(function(err) {
    throw new Error("Error in retrieving followers for user.")
  });
}

module.exports.getUserOriginalTimeline = (id) => {
  return models.Tweet.findAll({
    where: { userId: parseInt(id), originalId: null },
    attributes: ['content', 'createdAt']
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

module.exports.getUserTimeline = (id) => {
  return models.Tweet.findAll({
    where: { userId: id },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username']
    }],
    attributes: ['content', 'createdAt']
  }).catch(err => {
    throw new Error('Error in retrieving user tweets.')
  });
}

// TODO: Check Redis for home timeline of the user. If cache miss, use this query.
module.exports.getHomeTimeline = (id) => {
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
    throw new Error("Error in retrieving the home timeline for user")
  });
};

// TODO: Retrieve global timeline from Redis.
module.exports.getGlobalTimeline = () => {
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
    throw new Error("Error in retrieving the global timeline")
  });
};
