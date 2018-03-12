var models = require('../models');
module.exports.getSignup = function (req, res) {

  res.render('signup');
};

// Example return JSON:
// {
//  "id": 1,
//  "followerId": 1,
//  "followeeId": 2,
//  "updatedAt": "2018-03-08T22:52:09.442Z",
//  "createdAt":"2018-03-08T22:52:09.442Z"
// }
module.exports.follow = function (req, res) {
  var followeeId = parseInt(req.params.id);
  var followerId = parseInt(req.user.id);

  if(followeeId == followerId) {
    res.send("Can't follow myself");
    return;
  }
  var relationship = {
    followerId: followerId,
    followeeId: followeeId
  }
  models.Relationship.create(relationship).then(function(newRelationship) {
    console.log(JSON.stringify(newRelationship));
    res.render("NOT YET IMPLEMENTED", JSON.stringify(newRelationship));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports.followUser = function (req, res) {
  var followeeId = parseInt(req.params.id);
  var followerId = parseInt(req.user.id);

  if(followeeId == followerId) {
    res.send("Can't follow myself");
    return;
  }
  var relationship = {
    followerId: followerId,
    followeeId: followeeId
  }
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
module.exports.getUser = function (req, res) {
  return models.User.findOne({
    where: {id: parseInt(req.params.id)},
  }).then(function(user) {
    return JSON.parse(JSON.stringify(user))
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports.getUserID = function (req, res) {
  return models.User.findOne({
    where: {id: parseInt(req.params.id)},
  }).then(function(user) {
  return user.dataValues
  }).catch(function(err) {
    res.status(404).send(err);
  });
};
// Example return JSON:
// [{
//  "content":"hello",
//  "createdAt":"2018-03-08T19:00:17.085Z",
//  "user": {
//   "username":"bob_builder"
//  }
// },
// {
//  "content":"yo",
//  "createdAt":"2018-03-08T19:00:17.085Z",
//  "user": {
//   "username":"bob_builder"
//  }
// }]
// TODO: Set a limit for the results retrieved. (e.g. pagination)
module.exports.getTweets = function (req, res) {
  models.Tweet.findAll({
    where: {userId: parseInt(req.params.id)},
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['content', 'createdAt']
  }).then(function(tweets) {
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweets)));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports.getFollowees = function (req, res) {
  models.Relationship.findAll({
    where: {followerId: parseInt(req.params.id)},
    include: [{
      model: models.User,
      as: 'followee',
      attributes: ['username']
    }],
    attributes: ['username']
  }).then(function(followees) {
    res.render("NOT YET IMPLEMENTED", JSON.stringify(followees));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports.getFollowers = function (req, res) {
  models.Relationship.findAll({
    where: {followeeId: parseInt(req.params.id)},
    include: [{
      model: models.User,
      as: 'follower',
      attributes: ['username']
    }]
  }).then(function(followers) {
    res.render("NOT YET IMPLEMENTED", JSON.stringify(followers));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

// TODO: Fix this.
module.exports.getFolloweeTweets = function (req, res) {
  // User.findOne({ '_id':  req.params.id})
  // .populate({
  //   path: 'followees',
  //   populate: { path: 'followees.tweets', options: {sort: 'tweets.createdAt'}}
  // })
  // .exec(function (err, tweets) {
  //   if (err) {
  //     res.status(404).send(err);
  //     return;
  //   }
  //   res.send("NOT YET IMPLEMENTED");
  // });
  res.send("NOT YET IMPLEMENTED");
};

//TODO: fix create
module.exports.create=function(req, res, next){
  return models.User.create(req.user).then(function(user) {
    return JSON.stringify(user)
  });
};



module.exports.getAll=function(req, res, next) {
    models.User.findAll({
    attributes: ['id'],
    plain: true,
  }).then(function (users) {
    console.log(JSON.stringify(users))
    return users.dataValues
  }).catch(function(err) {
      console.log(err)
  });
};

module.exports.getAllCount=function(req, res, next) {
  return this.getAll().length
};

module.exports.destroyAll=function(req, res, next) {
    models.User.destroy({where: {}}).then(function () {});
}
module.exports.all=function(req, res, next) {
  return User.all;
}

module.exports.destroy=function(req, res, next) {
    models.User.destroy({where: {
      id: req.id
    }}).then(function (user) {
        return;

    }).done(function() {
  return;
  })
    return;
};
