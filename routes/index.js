var express = require('express');
var index = require('../controllers/index');
var router = express.Router();

router.get('/', index.index);

module.exports = router;
