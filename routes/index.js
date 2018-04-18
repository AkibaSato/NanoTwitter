var express = require('express');
var index = require('../controllers/index');
var router = express.Router();

router.get('/', index.index);
router.get('/loaderio-9d36f82c9435286460a24d8c3048aeeb', function(req, res, next){
  res.send("loaderio-9d36f82c9435286460a24d8c3048aeeb")
})

module.exports = router;
