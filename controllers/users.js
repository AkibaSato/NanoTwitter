var models = require('../models');
var sequelize = require('sequelize');
var helper = require('./helper');
var client = require('../config/redis')

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
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return;
  }
  var followeeId = parseInt(req.params.id);
  var followerId = parseInt(req.user.id);

  if(followeeId === followerId) {
    res.send("Can't follow myself");
    return;
  }

  models.Relationship.create({
    followerId: followerId,
    followeeId: followeeId
  })
  .then(relationship => {
    // Increment follower/followee counts in User models in the background.
    var followerPromise = models.User.update(
      { numFollowers: sequelize.literal(`"Users"."numFollowers" + 1`) },
      { where: { id: followeeId } });
    var followeePromise = models.User.update(
      { numFollowees: sequelize.literal(`"Users"."numFollowees" + 1`) },
      { where: { id: followerId } });
    sequelize.Promise.join(followerPromise, followeePromise,
      (followerResult, followeeResult) => {
        res.redirect('/user/' + followeeId);
      }
    ).catch(err => {
      res.status(404).send(err);
    });
  }).catch(err => {
    // Have already followed.
    if (err.name == 'SequelizeUniqueConstraintError') {
      // res.redirect('/user/' + followerId);
      res.status(404).send(err);
      return;
    }
    res.status(404).send(err);
  });
};

module.exports.unfollow = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return;
  }
  var followeeId = parseInt(req.params.id);
  var followerId = parseInt(req.user.id);

  models.Relationship.destroy({
    where: {
      followerId: followerId,
      followeeId: followeeId
    }
  }).then(results => {
    if (results > 0) {
      var followerPromise = models.User.update(
        { numFollowers: sequelize.literal(`"Users"."numFollowers" - 1`) },
        { where: { id: followeeId } });
      var followeePromise = models.User.update(
        { numFollowees: sequelize.literal(`"Users"."numFollowees" - 1`) },
        { where: { id: followerId } });
      sequelize.Promise.join(followerPromise, followeePromise,
        (followerResult, followeeResult) => {
          res.redirect('/user/' + followeeId);
        }
      ).catch(err => {
        res.status(404).send(err);
      });
    } else {
       res.status(404).send(new Error("Non-existent relationship"));
    }
    // var redirectURL = '../user/' + followeeId;
  }).catch(err => {
    res.status(404).send(err);
  });
};

module.exports.getUser = (req, res) => {
  var id;
  if (isNaN(req.params.id) && req.params.id!="testuser") {
    res.status(404).send(new Error("NaN parameter"));
    return
  } else if(req.params.id=="testuser") {
    id=parseInt(process.env.testid)
  } else {
    id= parseInt(req.params.id)
  }
  renderUser("usersa_profile" + id, id, req, res)
};

// Added basic caching to user info and tweets.
function renderUser(cacheKey, id, req, res) {
  client.get(cacheKey, function(err, data) {
    if(err || data === null) {
      sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserTimeline(id),
        (metadata, timeline) => {
          userData = {user: metadata, tweets: timeline , me: req.user}
          client.set(cacheKey, JSON.stringify(userData))
          res.render('user', userData)
        }
      ).catch(err => {
        res.status(404).send(err);
      })
    } else {
      client.get(cacheKey, function(err, data) {
        userData = JSON.parse(data)
        userData["me"] = req.user
        res.render('user', userData)
      });
    }
  });
}

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
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  var id = parseInt(req.params.id)
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserOriginalTimeline(id),
    (metadata, timeline) => {
      res.render("tweets", {
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
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  var id = parseInt(req.params.id)
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserFollowees(id),
    (metadata, followees) => {
      res.render("Following", {
        user: metadata,
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
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  var id = parseInt(req.params.id)
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getUserFollowers(id),
    (metadata, followers) => {
      res.render("Followers", {
        user: metadata,
        followers: JSON.parse(JSON.stringify(followers)),
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
    return;
  })
};

// Get tweets from the people that the user follows.
module.exports.getFolloweeTweets = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  var id = parseInt(req.params.id)
  sequelize.Promise.join(helper.getUserMetadata(id), helper.getHomeTimeline(id),
    (metadata, tweets) => {
      res.render("followee_Tweets", {
        user: JSON.parse(JSON.stringify(metadata)),
        tweets: JSON.parse(JSON.stringify(tweets)),
        me: req.user
      })
    }
  ).catch(err => {
    res.status(404).send(err);
  });
};
