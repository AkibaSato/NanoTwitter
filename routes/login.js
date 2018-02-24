var express = require('express');
var auth = require('../controllers/auth');
var router = express.Router();
var passport = require('passport');

router.get('/', auth.getLogin);
router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash : true
}));

module.exports = router;
