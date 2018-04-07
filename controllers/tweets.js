var models  = require('../models');
var sequelize = require('sequelize');
var client = require('../config/redis')

// Example return JSON:
// {
//  "id": 2,
//  "content": "hey",
//  "userId": 1,
//  "updatedAt": "2018-03-09T04:30:08.385Z",
//  "createdAt":"2018-03-09T04:30:08.385Z",
//  "parentId": null,
//  "originalId": null
// }
// TODO: Parse tweet content in background and insert into Hashtag and Mention.
module.exports.tweet =  (req, res) => {
  models.Tweet.create({
      content: req.body.content,
      userId: req.user.id,
      parentId: req.body.parentId
  }).then(tweet => {
    // res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweet)));
    models.User.update(
      { numTweets: sequelize.literal(`"Users"."numTweets" + 1`) },
      { where: { id: req.user.id }
    }).then(user => {

      res.redirect('/user/' + req.user.id);
      client.del('user_profile'+req.user.id.toString(), function(err, response) {
       if (response == 1) {
          console.log("Deleted Successfully!")
       } else{
        console.log("Cannot delete")
       }
    })
    }).catch(err => {
      res.status(404).send(err);
    });
  }).catch(err => {
    res.status(404).send(err);
  });


};

// Example return JSON:
// {
//  "content": "hello",
//  "createdAt": "2018-03-08T19:00:17.085Z",
//  "user": {
//   "username": "bob_builder"
//  }
// }
module.exports.getTweet = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  models.Tweet.findOne({
    where: { id: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['fname', 'lname', 'username']
    }],
    attributes: ['id', 'content', 'createdAt']
  }).then(tweet => {
    res.render('tweet', {
      tweet: JSON.parse(JSON.stringify(tweet)),
    })
  }).catch(err => {
    res.status(404).send(err);
  });
};

// Example return JSON:
// {
//  "id": 4,
//  "userId": 1,
//  "tweetId": 3,
//  "updatedAt": "2018-03-11T07:57:40.240Z",
//  "createdAt":"2018-03-11T07:57:40.240Z"
// }
module.exports.like = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }

  var userId = req.user.id;
  var tweetId = parseInt(req.params.id);

  models.Like.create({
    userId: userId,
    tweetId: tweetId
  }).then(like => {
      res.redirect('/user/' + userId);
  }).catch(err => {
    res.status(404).send(err);
  });
};

module.exports.unlike = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }

  var userId = req.user.id;
  var tweetId = parseInt(req.params.id);

  models.Like.destroy({
    where: {
      userId: userId,
      tweetId: tweetId
    }
  }).then(results => {
    res.redirect('/user/' + userId);
  }).catch(err => {
    res.status(404).send(err);
  });
};


// Example return JSON:
// [{
//  "createdAt": "2018-03-11T07:56:36.176Z",
//  "user": {
//    "username": "bob_builder"
//  }
// },
// {
//  "createdAt": "2018-03-11T07:56:36.176Z",
//  "user": {
//    "username": "dora_explorer"
//  }
// }]
module.exports.getLikes = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  models.Like.findAll({
    where: { tweetId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username']
    }],
    attributes: ['createdAt']
  }).then(users => {
    res.render('likes', {
      user: req.user,
      users: users,
    })
  }).catch(err => {
    res.status(404).send(err);
  });
};

// Example return JSON:
// {
//  "id": 4,
//  "content": "",
//  "userId": 1,
//  "updatedAt": "2018-03-09T04:30:08.385Z",
//  "createdAt":"2018-03-09T04:30:08.385Z",
//  "parentId": null,
//  "originalId": 2
// }
module.exports.retweet = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  models.Tweet.create({
      content: req.body.content,
      userId: req.user.id,
      originalId: parseInt(req.params.id)
  }).then(tweet => {
    // res.render("RETWEET NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweet)));
    res.redirect('/user/' + req.user.id);

  }).catch(err => {
    res.status(404).send(err);
  });
};



// Example return JSON:
// [{
//  "createdAt": "2018-03-11T07:56:36.176Z",
//  "user": {
//    "username": "bob_builder"
//  }
// },
// {
//  "createdAt": "2018-03-11T07:56:36.176Z",
//  "user": {
//    "username": "dora_explorer"
//  }
// }]
module.exports.getRetweets = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send(new Error("NaN parameter"));
    return
  }
  models.Tweet.findAll({
    where: { originalId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['id', 'username']
    }],
    attributes: ['createdAt']
  }).then(retweets => {
    res.render('retweets', {
      user: req.user,
      retweets: retweets,
    })
  }).catch(err => {
    res.status(404).send(err);
  });
};
