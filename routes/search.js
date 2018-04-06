var express = require('express');
var search = require('../controllers/search');
var router = express.Router();

router.get('/', search.search);

module.exports = router;
