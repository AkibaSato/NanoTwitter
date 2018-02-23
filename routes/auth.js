var express = require('express');
var auth = require('../controllers/auth');
var router = express.Router();

router.get('/', auth.getLogin);

router.post('/', auth.login);

module.exports = router;
