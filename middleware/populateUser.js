const redis = require('../config/redis');
const Sequelize = require('sequelize');
const User = require('../models').User;

module.exports = async (req, res, next) => {
  try {
    var user = await redis.getAsync(req.params.API_TOKEN);

    if (user) {
      req.user = JSON.parse(user); // If a user has an open session.
    }

  } catch (err) { }

  next();

}
