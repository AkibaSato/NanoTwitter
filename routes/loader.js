var express = require('express');
var users = require('../controllers/users');
var tweets = require('../controllers/tweets');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var session = require('../controllers/session');

router.post('/tweet', (req, res, next) => {
  console.log("tweeting")
  req.body = req.query
  req.params.id = 1
  req.user = { id: 1, fname: 'loader', lname: 'loader', username: 'loader' };
  tweets.tweet(req, res)
});


router.get('/', (req, res, next) => {
  req.params.id = 1
  users.getUser(req, res)
});

module.exports = router
