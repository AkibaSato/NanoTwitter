var models = require('../../models');


module.exports.followUser = function (req, res, next) {
  // person you want to follow
  var followeeId = parseInt(req.params.id)
// person that is following a person
  var followerId = parseInt(req.params.follow_id);
  // console.log(followeeId)
  // console.log(followerId)
  if(followeeId == followerId) {
    res.send("Can't follow myself");
    return;
  }
  var relationship = {followerId: followerId,  followeeId: followeeId  }
  models.Relationship.create(relationship).then(function(newRelationship) {
    console.log(JSON.stringify(newRelationship));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};






// Example return JSON:
// {
//  "name": "Bob Builder"
//  "username": "bob_builder",
// }
module.exports.getUser = function (req, res, next) {
  return models.User.findOne({where: {id: parseInt(req.params.id)}})
  .then(function(user) {return JSON.parse(JSON.stringify(user))})
  .catch(function(err) {res.status(404).send(err)});
};



module.exports.create=function(req, res, next){
  return models.User.create(req.user)
  .then(function(user) {return JSON.parse(JSON.stringify(user))});
};


module.exports.getAll=async function(req, res, next) {
  return await models.User.findAll({

  }).then(function (user) {
    return user
  }).catch(function(err) {
      console.log(err)
  });
};


module.exports.randomUser=async function(req, rex, next) {
  return models.User.findAll({ order: 'random()', limit: req.params.limit, offset: 1, where: {
    id: {not: req.params.id}
  } }).then(function(user) {
    return JSON.parse(JSON.stringify(user))
  })}

module.exports.getAllCount=function(req, res, next) {
  return this.getAll().length
};

module.exports.destroyAll=function(req, res, next) {
    models.User.destroy({where: {}}).then(function () {});
}


module.exports.destroy=function(req, res, next) {
    models.User.destroy({where: { id: req.id}})
    .then(function (user) { return; })
    .done(function() {return; })
};
