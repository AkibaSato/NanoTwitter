var express = require('express');
var session = require('../controllers/session');
var router = express.Router();

router.post('/', session.logout);

module.exports = router;
