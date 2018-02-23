var express = require('express');
var tweets = require('../controllers/tweets');
var router = express.Router();

router.post('/new', tweets.tweet);
router.get('/:id', tweets.getTweet);

module.exports = router;
