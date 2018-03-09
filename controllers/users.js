var Hashtag = require('../models/hashtag');
var Mention = require('../models/mention');
var Relationship = require('../models/relationship');
var User = require('../models/').User;
var Tweet = require('../models/tweet');
module.exports.follow = function (req, res, next) {
  // var targetId = req.params.id;
  // var requesterId = req.user._id;
  //
  // if(targetId == requesterId) {
  //   res.send("Can't follow myself");
  //   return;
  // }
  //
  // Relationship.findOne({'follower': requesterId, 'followee': targetId},
  //   function(err, relation) {
  //     if (err) {
  //       res.status(404).send(err);
  //       return;
  //     }
  //     if (relation) {
  //       res.send("Already followed");
  //       return;
  //     }
  //     var newRelation = new Relationship({
  //       follower: requesterId,
  //       followee: targetId,
  //       createdAt: req.body.timestamp
  //     });
  //     User.findOne({'_id': requesterId}, function(err, requester) {
  //       if(err) {
  //         res.status(404).send(err);
  //         return;
  //       }
  //       requester.followees.push(targetId);
  //       User.findOne({'_id': targetId}, function(err, target) {
  //         if(err) {
  //           res.status(404).send(err);
  //           return;
  //         }
  //         target.followers.push(requesterId);
  //         requester.save();
  //         target.save();
  //         newRelation.save();
  //         res.send("NOT YET IMPLEMENTED");
  //       });
  //     });
  //   });
  res.send("NOT YET IMPLEMENTED");

};

module.exports.getSignup = function (req, res, next) {
  res.render('signup');
};

module.exports.getUser = function (req, res, next) {
  // User.findOne({_id: req.params.id}, {password: 0, email: 0},
  //   function (err, user) {
  //      if (err) {
  //        res.status(404).send(err);
  //        return;
  //      }
  //      res.send("NOT YET IMPLEMENTED");
  // });
  res.send("NOT YET IMPLEMENTED");
};

module.exports.getTweets = function (req, res, next) {
  // User.findOne({ _id: req.params.id })
  // .populate('tweets')
  // .exec(function (err, user) {
  //   if (err) {
  //     res.status(404).send(err);
  //     return;
  //   }
  //   var tweets = user.tweets;
  //   res.send("NOT YET IMPLEMENTED");
  // });
  res.send("NOT YET IMPLEMENTED");

};

module.exports.getFollowees = function (req, res, next) {
  // User.findOne({ '_id': req.params.id })
  // .populate('followees', {_id: 0, username: 1})
  // .exec(function (err, user) {
  //   if (err) {
  //     res.status(404).send(err);
  //     return;
  //   }
  //   var followees = user.followees;
  //   res.send("NOT YET IMPLEMENTED");
  // });
  res.send("NOT YET IMPLEMENTED");

};

module.exports.getFollowers = function (req, res, next) {
  // User.findOne({ '_id': req.params.id })
  // .populate('followers', {_id: 0, username: 1})
  // .exec(function (err, user) {
  //   if (err) {
  //     res.status(404).send(err);
  //     return;
  //   }
  //   var followers = user.followers;
  //   res.send("NOT YET IMPLEMENTED");
  // });
  res.send("NOT YET IMPLEMENTED");
};

// TODO: Fix this.
module.exports.getFolloweeTweets = function (req, res, next) {
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
module.exports.create=function(req, res, next){
  var data = {
    fname: req.fname,
    lname: req.lname,
    username: req.username,
    email: req.email,
    password: User.generateHash(req.password)
  };

  User.create(data).then(function(newUser) {
    return done(null, newUser);
  }.catch(function(err){
    console.log(err)
    return;
  }));
};

module.exports.destroy=function(req, res, next) {
  User.destroy({where: {
    id: req.id
  }}).then(function (user) {
    console.log("user deleted")
    return;
  }
).catch(function(err) {
  console.log(err)
});
};


module.exports.getAll=function(req, res, next) {
  users=[];
  User.findAll({
    attributes: ['id']
  }).then(function (users) {
    users=users
    console.log(users)
  }).catch(function(err) {
      console.log(err)
  });
  return users;
};

module.exports.getAllCount=function(req, res, next) {
  return this.getAll().length
};

module.exports.destroyAll=function(req, res, next) {
  User.destroy({where: {}}).then(function () {});
}

module.exports.destory=function(req, res, next) {
  User.destroy({where: {
    id: req.id
  }}).then(function () {});
}
