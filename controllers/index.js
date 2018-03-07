const User = require('../models').User;

module.exports.index = (req, res, next) => {
  res.render('index', {
    req: req
  });
};
