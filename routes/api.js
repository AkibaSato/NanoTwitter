var express = require('express');
var api = require('../controllers/api');
var router = express.Router();

// router.get('/', index.index);

/* ============= Users ============= */
router.get('/users/:id/tweets', api.getUserTweets);
router.get('/users/:id/followees', api.getFollowees);
router.get('/users/:id/followers', api.getFollowers);
router.get('/users/:id', api.getUser);

/* ============= Tweets ============= */
router.post('/tweets/new', api.tweet);
router.get('/tweets/recent', api.getTimeline);
router.get('/tweets/:id/likes', api.getLikes);
router.get('/tweets/:id/retweets', api.getRetweets);
router.get('/tweets/:id', api.getTweet);

/* ============= Search ============= */
router.get('/search', api.search);

/* ============= Session ============= */
router.post('/users/register', api.signup);
router.post('/logout', api.logout);
router.post('/login', api.login);

module.exports = router;
