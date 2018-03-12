var express = require('express');
var tweets = require('../controllers/tweets');
var router = express.Router();

router.post('/new', tweets.tweet);
router.get('/:id', tweets.getTweet);
router.get('/:id/likes', tweets.getLikes);
router.post('/:id/like', tweets.like);
router.get('/:id/retweets', tweets.getRetweets);
router.post('/:id/retweet', tweets.retweet);

module.exports = router;
