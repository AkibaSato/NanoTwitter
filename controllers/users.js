var models = require('../models');
var sequelize = require('sequelize');

module.exports.getSignup = (req, res) => {
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
module.exports.follow = (req, res) => {
  var followeeId = parseInt(req.params.id);
  var followerId = parseInt(req.user.id);

  if(followeeId == followerId) {
    res.send("Can't follow myself");
    return;
  }

  models.Relationship.create({
    followerId: followerId,
    followeeId: followeeId
  })
  .then(relationship => {
    res.render(
      "NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(relationship)));
  }).catch(err => {
    res.status(404).send(err);
  });
  // Increment follower/followee counts in User models in the background.
  models.User.update(
    { numFollowers: sequelize.literal('numFollowers + 1') },
    { where: { id: followeeId } });
  models.User.update(
    { numFollowees: sequelize.literal('numFollowees + 1') },
    { where: { id: followerId } });
};

module.exports.unfollow = (req, res) => {
  var followeeId = parseInt(req.params.id);
  var followerId = parseInt(req.user.id);

  models.Relationship.destroy({
    where: {
      followerId: followerId,
      followeeId: followeeId
    },
    truncate: true
  }).then(results => {
    // var redirectURL = '../user/' + followeeId;
    res.redirect('../user/' + followeeId);
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports.getUser = (req, res) => {
  id = parseInt(req.params.id)
  sequelize.Promise.join(getUserMetadata(id), getUserTimeline(id),
    (metadata, timeline) => {
      console.log(JSON.stringify({
        user: JSON.parse(JSON.stringify(metadata)),
        tweets: JSON.parse(JSON.stringify(timeline)),
        me: req.user
      }))
      console.log("hello")
      res.render('user', {
        user: JSON.parse(JSON.stringify(metadata)),
        tweets: JSON.parse(JSON.stringify(timeline)),
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
  })
};

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
module.exports.getTweets = (req, res) => {
  id = parseInt(req.params.id)
  sequelize.Promise.join(getUserMetadata(id), getUserOriginalTimeline(id),
    (metadata, timeline) => {
      console.log(JSON.stringify({
        user: JSON.parse(JSON.stringify(metadata)),
        timeline: JSON.parse(JSON.stringify(timeline)),
        me: req.user
      }))
      console.log("hello")
      res.render("NOT YET IMPLEMENTED", {
        user: JSON.parse(JSON.stringify(metadata)),
        tweets: JSON.parse(JSON.stringify(timeline)),
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
  })
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
module.exports.getFollowees = (req, res) => {
  var id = req.params.id
  sequelize.Promise.join(getUserMetadata(id), getUserFollowees(id),
    (metadata, followees) => {
      console.log(JSON.stringify({
        user: JSON.parse(JSON.stringify(metadata)),
        timeline: JSON.parse(JSON.stringify(followees)),
        me: req.user
      }))
      console.log("hello")
      res.render("NOT YET IMPLEMENTED", {
        user: JSON.parse(JSON.stringify(metadata)),
        followees: JSON.parse(JSON.stringify(followees)),
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
  })
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
module.exports.getFollowers =  (req, res) => {
  var id = req.params.id
  sequelize.Promise.join(getUserMetadata(id), getUserFollowers(id),
    (metadata, followers) => {
      console.log(JSON.stringify({
        user: JSON.parse(JSON.stringify(metadata)),
        followers: JSON.parse(JSON.stringify(followers)),
        me: req.user
      }))
      console.log("hello")
      res.render("NOT YET IMPLEMENTED", {
        user: JSON.parse(JSON.stringify(metadata)),
        followers: JSON.parse(JSON.stringify(followers)),
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
  })
};

// TODO: Fix this.
module.exports.getFolloweeTweets = (req, res) => {
  var id = req.params.id
  sequelize.Promise.join(getUserMetadata(id), getUserFollowers(id),
    (metadata, followers) => {
      console.log(JSON.stringify({
        user: JSON.parse(JSON.stringify(metadata)),
        followers: JSON.parse(JSON.stringify(followers)),
        me: req.user
      }))
      console.log("hello")
      res.render("NOT YET IMPLEMENTED", {
        user: JSON.parse(JSON.stringify(metadata)),
        followers: JSON.parse(JSON.stringify(followers)),
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
  });
};

function getUserFollowers(id) {
  return models.Relationship.findAll({
    where: { followeeId: parseInt(id) },
    include: [{
      model: models.User,
      as: 'follower',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).catch(function(err) {
    throw new Error("Error in finding followers for user.")
  });
}

function getUserFollowees(id) {
  return models.Relationship.findAll({
    where: { followerId: parseInt(id) },
    include: [{
      model: models.User,
      as: 'followee',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).catch(function(err) {
    throw new Error("Error in finding followers for user.")
  });
}

function getUserOriginalTimeline (id) {
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
function getUserMetadata (id) {
  return models.User.findOne({
    where: { id: id },
  }).catch(err => {
    throw new Error('Error in retrieving user metadata.')
  });
}

function getUserTimeline (id) {
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
