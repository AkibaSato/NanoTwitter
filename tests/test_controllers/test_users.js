var models = require('../../models');

module.exports.followUser = function (req, res, followeeId, followerId) {
  // person you want to follow
  var followeeId = parseInt(followeeId)
// person that is following a person
  var followerId = parseInt(followerId);
  if(followeeId == followerId) {
    res.send("Can't follow myself");
    return;
  }
  var relationship = {followerId: followerId,  followeeId: followeeId  }
  models.Relationship.create(relationship).then(function(newRelationship) {
    return JSON.parse(JSON.stringify(newRelationship));
  }).catch(function(err) {
    // res.status(404).send(err);
  });
};

module.exports.getFollowers=async function (req, res, id) {
  var searchData = {followerId: parseInt(id)}
  return models.Relationship.findAll(
    {attributes: ['followerId'], where: searchData}
  ).then(function(newRelationship) {
    return JSON.parse(JSON.stringify(newRelationship));
  }).catch(function(err) {
    console.log(err)
  });
};

module.exports.getFollowees=async function (req, res, id) {
  var userID=parseInt(id)
  var searchData = {followeeId: userID}
  return models.Relationship.findAll(
    {attributes: ['followerId'], where: searchData}
  ).then(function(newRelationship) {
    return JSON.parse(JSON.stringify(newRelationship));
  }).catch(function(err) {
    console.log(err)
  });
};


module.exports.getUser = function (req, res, userID) {
  return models.User.findOne({where: {id: parseInt(userID)}})
  .then(function(user) {
    return JSON.parse(JSON.stringify(user))})
  .catch(function(err) {
    console.log(err)
    res.status(404).send(err)});
};

module.exports.findUserFromName = function (req, res, username) {
  return models.User.findOne({where: {username: username}})
  .then(function(user) {
    return JSON.parse(JSON.stringify(user))})
  .catch(function(err) {
    res.status(404).send(err)});
};




module.exports.create=async function(req, user_data){
  return models.User.create(user_data)
  .then(function(user) {
    return JSON.parse(JSON.stringify(user)
  )});
};


module.exports.bulkCreate=async function(req, user_data){
  return models.User.bulkCreate(user_data, {returning: true})
  .then(function(users) {
    return JSON.parse(JSON.stringify(users)
  )})
};


module.exports.getAll=async function(req, res, next) {
  return await models.User.findAll({

  }).then(function (user) {
    return user
  }).catch(function(err) {
      console.log(err)
  });
};


module.exports.randomUser=async function(req, res, numberUsers, userID) {
  var sequelize=require('sequelize')
  return models.User.findAll({order: [sequelize.fn('RANDOM')]
, limit: parseInt(numberUsers), offset: 1, where: {
    id: {not: parseInt(userID)}
  } }).then(function(user) {
    return JSON.parse(JSON.stringify(user))
  }).catch(function(err) {
      console.log(err)
  });
}

module.exports.getAllCount=function(req, res, next) {
  return this.getAll().length
};

module.exports.destroyAll=function(req, res, next) {
    return models.User.destroy({where: {}});
    // models.User.truncate({ cascade: true });

};
//
// models.Relationship.generate=function(req, res, next) {
//   return models.User.create(models.Tweet.create(res).then(function(tweet) {
//       return tweet
//   }).catch(function(err) {
//     console.log(err);
//     res.status(404).send(err);
//   });
// });
//

module.exports.generate=async function(req, data) {
  return User.create(data).then(function(newUser) {
    return newUser;
  }).catch(function(err) {
    console.log(err)
  });
};


module.exports.bulkGenerate=async function(req, data) {
  return models.User.bulkCreate(data).then(function(newUser) {
    return JSON.parse(JSON.stringify(newUser));
  }).catch(function(err) {
    console.log(err)
  });
};



module.exports.destroy=function(u_id) {
    models.User.destroy({where: { id: u_id}})
    .then(function (user) { return; })
    .done(function() {return; })
};
