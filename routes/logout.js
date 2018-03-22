var express = require('express');
var session = require('../controllers/session');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, session.logout);

module.exports = router;
