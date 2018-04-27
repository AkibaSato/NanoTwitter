var express = require('express');
var users = require('../controllers/users');
var tweets = require('../controllers/tweets');
var router = express.Router();

router.post('/tweet', (req, res, next) => {
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
