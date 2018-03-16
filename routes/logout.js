var express = require('express');
var session = require('../controllers/session');
var router = express.Router();

router.get('/', session.logout);


module.exports = router;
