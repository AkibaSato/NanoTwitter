const redis = require('../config/redis');
const Sequelize = require('sequelize');
const User = require('../models').User;

module.exports.getLogin = (req, res) => {
  res.render('login');
};

module.exports.logout = async (req, res) => {

  try {
    await this.client.delAsync(req.API_TOKEN);

  } catch (err) {}
  res.redirect('/api/v1/public/');

};

module.exports.signup = async (req, res) => {
  try {
    var user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [ { username: req.body.username }, { email: req.body.email }]
      }
    });

    if (user) {
      return res.redirect('/api/v1/public/user/register')
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
    res.redirect('/api/v1/' + user.id + '/');
    await redis.setAsync(user.id, JSON.stringify(
      { ntSessionId: ntSessionId,
        user: { id: user.id, username: user.username, password: user.password }
      }
    ));

  } catch (err) {
    res.redirect('/api/v1/public/user/register');

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

      return res.redirect('/api/v1/public/login');
    }

    var ntSessionId = generateUid();
    res.cookie('ntSessionId', ntSessionId);

    res.redirect('/api/v1/' + user.id + '/');

    await redis.setAsync(user.id, JSON.stringify(
      { ntSessionId: ntSessionId, user: user.get() }
    ));

  } catch (err) {
    console.log(err)
    res.redirect('/api/v1/public/login');

  }
}

function generateUid() {
  const t = (new Date).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}
