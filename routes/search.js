var express = require('express');
var search = require('../controllers/search');
var router = express.Router();

router.post('/', search.search);

module.exports = router;