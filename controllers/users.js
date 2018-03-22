var models = require('../models');
var sequelize = require('sequelize');
var helper = require('./helper');

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
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserTimeline(id),
    (metadata, timeline) => {
      res.render('user', {
        user: metadata,
        tweets: timeline,
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
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserOriginalTimeline(id),
    (metadata, timeline) => {
      res.render("NOT YET IMPLEMENTED", {
        user: metadata,
        tweets: tweets,
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
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserFollowees(id),
    (metadata, followees) => {
      res.render("NOT YET IMPLEMENTED", {
        user: metadata,
        followees: followees,
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
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserFollowers(id),
    (metadata, followers) => {
      res.render("NOT YET IMPLEMENTED", {
        user: metadata,
        followers: followers,
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
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserFollowers(id),
    (metadata, followers) => {
      res.render("NOT YET IMPLEMENTED", {
        user: metadata,
        followers: followers,
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
  });
};
