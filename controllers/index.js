const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');

module.exports.index = function (req, res, next) {


  res.render('index', {
        title: 'List of Tweets',
      });
};
