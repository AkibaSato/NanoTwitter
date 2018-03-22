var models  = require('../models');
var sequelize = require('sequelize');

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
    res.redirect('../user/' + req.user.id);
  }).catch(err => {
    res.status(404).send(err);
  });
  models.User.update(
    { numTweets: sequelize.literal('numTweets + 1') },
    { where: { id: req.user.id } });
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
  models.Tweet.findOne({
    where: { id: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['content', 'createdAt']
  }).then(tweet => {
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweet)));
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
  models.Like.create({
    userId: user,
    tweetId: req.params.id
  }).then(like => {
    res.render(
      "NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(like)));
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
  models.Like.findAll({
    where: { tweetId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).then(users => {
    console.log(JSON.stringify(users));
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(users)));
  }).catch(err => {
    console.log(err)
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
  models.Tweet.create({
      content: "",
      userId: req.user.id,
      originalId: req.params.id
  }).then(tweet => {
    console.log(JSON.stringify(tweet));
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweet)));
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
  models.Tweet.findAll({
    where: { originalId: parseInt(req.params.id) },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['createdAt']
  }).then(retweets => {
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(retweets)));
  }).catch(err => {
    console.log(err)
    res.status(404).send(err);
  });
};
