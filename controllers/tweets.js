var models  = require('../models');

// Example return JSON:
// {
//  "id": 2,
//  "content": "hey",
//  "userId": 1,
//  "updatedAt": "2018-03-09T04:30:08.385Z",
//  "createdAt":"2018-03-09T04:30:08.385Z",
//  "parentId": null
// }
// TODO: Parse tweet content in background and insert into Hashtag and Mention.
module.exports.tweet =  function (req, res) {
  models.Tweet.create({
      content: req.body.content,
      userId: req.user.id,
      parentId: req.body.parentId
  }).then(function(tweet) {
    console.log(JSON.stringify(tweet));
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweet)));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

// Example return JSON:
// {
//  "content": "hello",
//  "createdAt": "2018-03-08T19:00:17.085Z",
//  "user": {
//   "username":"meg"
//  }
// }
module.exports.getTweet = function (req, res) {
  models.Tweet.findOne({
    where: { id: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['content', 'createdAt']
  }).then(function(tweet) {
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweet)));
  }).catch(function(err) {
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
module.exports.like = function (req, res) {
  var tweet = parseInt(req.params.id);
  var user = 1;

  var like = {
    userId: user,
    tweetId: tweet
  };

  models.Like.create(like).then(function(newLike) {
    console.log(JSON.stringify(newLike));
    res.render(
      "NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(newLike)));
  }).catch(function(err) {
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
module.exports.getLikes = function (req, res) {
  models.Like.findAll({
    where: { tweetId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).then(function(users) {
    console.log(JSON.stringify(users));
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(users)));
  }).catch(function(err) {
    console.log(err)
    res.status(404).send(err);
  });
};
