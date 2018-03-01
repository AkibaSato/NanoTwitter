const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');

module.exports.index = (req, res) => {


  res.render('index', {
        title: 'List of Tweets',
      });
};
