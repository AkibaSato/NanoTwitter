const redis = require('../config/redis');
const Sequelize = require('sequelize');
const User = require('../models').User;

module.exports.getLogin = (req, res) => {
  res.render('login');
};

module.exports.logout = async (req, res) => {

  try {
    await this.client.delAsync(req.params.API_TOKEN);

  } catch (err) {}
  res.redirect('/');

};

module.exports.signup = async (req, res) => {
  try {
    var user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [ { username: req.body.username }, { email: req.body.email }]
      }
    });

    if (user) {
      return res.redirect('/api/v1/:API_TOKEN/signup')
    }

    await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      password: User.generateHash(req.body.password)
    });

    await redis.setSync(req.params.API_TOKEN, JSON.stringify(user.get());

    res.redirect('/api/v1/:API_TOKEN/');

  } catch (err) {

    res.redirect('/signup');

  }
}

module.exports.login = async (req, res) => {
  try {
    // var user = await this.client.getAsync(req.params.API_TOKEN);
    var user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [ { username: req.body.username } ]
      }
    });

    if (!user || !user.validatePassword(req.body.password)) {
      return res.redirect('/login');
    }

    await redis.setSync(user.id, JSON.stringify(user.get());

    res.redirect('/api/v1/:API_TOKEN/');

  } catch (err) {

    res.redirect('/login');

  }
}
