var express = require('express');
var users = require('../controllers/users');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var session = require('../controllers/session');

router.get('/register', users.getSignup);
router.get('/:id', users.getUser);
router.get('/:id/tweets', users.getUser);
router.get('/:id/followees', users.getFollowees);
router.get('/:id/followers', users.getFollowers);
router.get('/:id/followee_tweets', users.getFolloweeTweets);
router.post('/:id/follow', isLoggedIn, users.follow);
router.post('/:id/unfollow', isLoggedIn, users.unfollow);

router.post('/register', session.signup);


module.exports = router;
