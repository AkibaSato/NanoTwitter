var express = require('express');
var users = require('../controllers/users');
var passport = require('passport');
var router = express.Router();

router.get('/register', users.getSignup);
router.get('/:id', users.getUser);
router.get('/:id/tweets', users.getTweets);
router.get('/:id/followees', users.getFollowees);
router.get('/:id/followers', users.getFollowers);
router.get('/:id/followee_tweets', users.getFolloweeTweets);
router.post('/:id/follow', users.follow);
router.delete('/:id/follow', users.unfollow);

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/user/register',
  failureFlash : true
}));

module.exports = router;
