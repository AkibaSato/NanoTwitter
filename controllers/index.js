const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');

module.exports.index = function (req, res, next) {
  console.log(req.user)

  res.render('index', {
    req: req
    
  });
};
