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
  };

  models.Relationship.create(relationship).then(function(newRelationship) {
    res.render(
      "NOT YET IMPLEMENTED2", JSON.parse(JSON.stringify(newRelationship)));
    // var redirectURL = '../user/' + followeeID;
    // res.redirect(redirectURL);
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports.unfollow = function (req, res) {
  var followeeId = parseInt(req.params.id);
  var followerId = parseInt(req.user.id);

  models.Relationship.destroy({
    where: {
      followerId: followerId,
      followeeId: followeeId
    },
    truncate: true
  }).then(results => {
    res.render(
      // "NOT YET IMPLEMENTED2", JSON.parse(JSON.stringify(newRelationship)));
    // var redirectURL = '../user/' + followeeId;
    res.redirect('../user/' + followeeId));
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
  var userData;
  // console.log(getFollowees(req, res));
  var following;
  var followers;
  var followingCount = -1;
  var followerCount = -1;


  //


  var tweets;
  models.User.findOne({
    where: { id: parseInt(req.params.id) },
    attributes: ['id', 'username', 'fname', 'lname']
  }).then(result => {
    userData = result;
  }).catch(function(err) {
    res.status(404).send(err);
  });

  models.Relationship.findAll({
    where: { followerId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'followee',
      attributes: ['id', 'username']
    }],
    attributes: ['createdAt']
  }).then(result => {
    following = result;
    followingCount = following.length;
  }).catch(function(err) {
    res.status(404).send(err);
  });

  models.Relationship.findAll({
    where: { followeeId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'follower',
      attributes: ['id', 'username']
    }],
    attributes: ['createdAt']
  }).then(result => {
    followers = result;
    followerCount = followers.length;
  }).catch(function(err) {
    res.status(404).send(err);
  });


  models.Tweet.findAll({
    where: { userId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username', 'fname', 'lname']
    }],
    attributes: ['content', 'createdAt']
  }).then(result => {
    tweets = result;
    res.render('user', {
      req: req,
      userData: userData,
      // userData: tweets.user,
      tweets: tweets,
      tweetCount: tweets.length,

      following: following,
      followers: followers,

      followingCount: followingCount,
      followerCount: followerCount,
      atIndex: false,
      currUser: false,
      test2: 2
    });
  }).catch(function(err) {
    res.status(404).send(err);
  });
};


// module.exports.getUser = function (req, res) {
//   var userData;
//   let followingCount = 0;
//   let followerCount = 0;
//   var tweets;
//   models.User.findOne({
//     where: { id: parseInt(req.params.id) },
//     attributes: ['id', 'username', 'fname', 'lname']
//   }).then(result => {
//     userData = result;
//   });
//
//   models.Tweet.findAll({
//     where: { userId: parseInt(req.params.id) },
//     include: [{
//       model: models.User,
//       as: 'user',
//       attributes: ['id', 'username', 'fname', 'lname']
//     }],
//     attributes: ['content', 'createdAt']
//   }).then(result => {
//     tweets = result;
//     res.render('user', {
//       req: req,
//       userData: userData,
//       // userData: tweets.user,
//       tweets: tweets,
//       tweetCount: tweets.length,
//       followingCount: followingCount,
//       followerCount: followerCount,
//       atIndex: false,
//       currUser: false,
//       test2: 2
//     });
//   }).catch(function(err) {
//     res.status(404).send(err);
//   });
// };

// module.exports.getUser = function (req, res) {
//   models.User.findOne({
//     where: { id: parseInt(req.params.id) },
//     attributes: ['fname', 'lname', 'username']
//   }).then(function(user) {
//     var userData = {
//       name: user.fullName,
//       username: user.username,
//       req: req,
//       test: 1
//     }
//     res.render("user", userData);
//   }).catch(function(err) {
//     res.status(404).send(err);
//   });
// };

// Example return JSON:
// [{
//  "content": "hello",
//  "createdAt":"2018-03-08T19:00:17.085Z",
//  "user": {
//   "username":"bob_builder"
//  }
// },
// {
//  "content": "yo",
//  "createdAt":"2018-03-08T19:00:17.085Z",
//  "user": {
//   "username":"bob_builder"
//  }
// }]
// TODO: Set a limit for the results retrieved. (e.g. pagination)
module.exports.getTweets = function (req, res) {

  models.Tweet.findAll({
    where: { userId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['content', 'createdAt']
  }).then(function(tweets) {
    res.render('user', JSON.parse(JSON.stringify(tweets)), {
      req: req,
      tweets: tweets,
      test2: 2
    });
  }).catch(function(err) {
    res.status(404).send(err);
  });
};




// Example return JSON:
// [{
//  "createdAt": "2018-03-08T22:51:09.277Z",
//  "followee": {
//    "username":"bob_builder"
//  }
// },
// {
//  "createdAt": "2018-03-08T22:52:09.442Z",
//  "followee": {
//    "username":"dora_explorer"
//  }
// }]
module.exports.getFollowees = function (req, res) {
  models.Relationship.findAll({
    where: { followerId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'followee',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).then(followees => {
    return followees;
    // res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(followees)));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

// Example return JSON:
// [{
//  "createdAt": "2018-03-08T22:51:09.277Z",
//  "follower": {
//    "username":"bob_builder"
//  }
// },
// {
//  "createdAt": "2018-03-08T22:52:09.442Z",
//  "follower": {
//    "username":"dora_explorer"
//  }
// }]
module.exports.getFollowers = function (req, res) {
  models.Relationship.findAll({
    where: { followeeId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'follower',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).then(followers => {
    return followers;
    // res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(followers)));
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
