var express = require('express');
var session = require('../controllers/session');
var router = express.Router();
var passport = require('passport');

router.get('/', session.getLogin);
router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash : true
}));

module.exports = router;
