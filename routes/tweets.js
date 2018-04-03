var express = require('express');
var tweets = require('../controllers/tweets');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.post('/new', isLoggedIn, tweets.tweet);
router.get('/:id', tweets.getTweet);
router.get('/:id/likes', tweets.getLikes);
router.post('/:id/like', isLoggedIn, tweets.like);
router.get('/:id/retweets', tweets.getRetweets);
router.post('/:id/retweet', isLoggedIn, tweets.retweet);

module.exports = router;
