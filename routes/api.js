var express = require('express');
var api = require('../controllers/api');
var router = express.Router();

// router.get('/', index.index);

/* ============= Users ============= */
router.get('/user/:id/tweets', api.getUser);
router.get('/user/:id/followees', api.getFollowees);
router.get('/user/:id/followers', api.getFollowers);
router.get('/user/:id', api.getUser);

/* ============= Tweets ============= */
router.post('/tweets/new', api.tweet);
router.get('/tweets/:id/likes', api.getLikes);
router.get('/tweets/:id/retweets', api.getRetweets);
router.get('/tweets/:id', api.getTweet);
router.get('/tweets/recent', api.getTweet);

/* ============= Search ============= */
router.get('/search', api.search);

/* ============= Session ============= */
router.post('/user/register', api.signup);
router.post('/logout', api.logout);
router.post('/login', api.login);

module.exports = router;
