var express = require('express');
var users = require('../controllers/users');
var router = express.Router();

router.get('/register', users.getRegister);
router.get('/:id', users.getUser);
router.get('/:id/tweets', users.getTweets);
router.get('/:id/followees', users.getFollowees);
router.get('/:id/followers', users.getFollowers);
router.get('/:id/followee_tweets', users.getFolloweeTweets);
router.post('/:id/follow', users.follow);
router.post('/register', users.register);

module.exports = router;
