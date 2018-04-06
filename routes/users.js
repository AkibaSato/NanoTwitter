var express = require('express');
var users = require('../controllers/users');
var passport = require('passport');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn')

router.get('/register', users.getSignup);
router.get('/:id', async function(req, res) {
  var hrTime = process.hrtime();
  console.log(hrTime[0] * 1000000000 + hrTime[1]);
  await users.getUser(req, res)
})
router.get('/:id/tweets', users.getOriginalTweets);
router.get('/:id/followees', users.getFollowees);
router.get('/:id/followers', users.getFollowers);
router.get('/:id/followee_tweets', users.getFolloweeTweets);
router.post('/:id/follow', isLoggedIn, users.follow);
router.post('/:id/unfollow', isLoggedIn, users.unfollow);

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/user/register',
  failureFlash : true
}));

module.exports = router;
