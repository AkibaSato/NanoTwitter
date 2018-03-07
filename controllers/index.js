const User = require('../models').User;

module.exports.index = (req, res, next) => {
  console.log(req.user.username);
  res.render('index', {
    req: req
    // title: 'List of Tweets',
  });
};
