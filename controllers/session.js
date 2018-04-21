const redis = require('../config/redis');
const Sequelize = require('sequelize');
const User = require('../models').User;

module.exports.getLogin = (req, res) => {
  res.render('login');
};

module.exports.logout = async (req, res) => {

  try {
    await this.client.delAsync(req.cookies.ntSessionId);
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
      return res.redirect('/user/register')
    }

    user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    var ntSessionId = generateUid();
    res.cookie('ntSessionId', ntSessionId);
    await redis.setAsync(ntSessionId, JSON.stringify({ user: {
      username: user.username,  password: user.password, id: user.id
    } }));
    res.redirect('/user/' + user.id + '/');

  } catch (err) {
    res.redirect('/user/register');

  }
}

module.exports.login = async (req, res) => {
  try {
    // var user = await this.client.getAsync(req.params.API_TOKEN);
    var user = await User.findOne({
      where: {
        username: req.body.username
      },
      attributes: ['id', 'username', 'password']
    });

    if (!user || user.password != req.body.password) {

      return res.redirect('/login');
    }

    var ntSessionId = generateUid();
    res.cookie('ntSessionId', ntSessionId);

    await redis.setAsync(ntSessionId, JSON.stringify({ user: user.get() }) );

    res.redirect('/user/' + user.id);

  } catch (err) {
    res.redirect('/login');

  }
}

function generateUid() {
  const t = (new Date).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}
