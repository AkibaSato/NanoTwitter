var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service

var axios = require('axios');

/* ============= Users ============= */

module.exports.logout = async (req, res) => {

  try {
    await redis.delAsync(req.API_TOKEN);
    res.sendStatus(200)
  } catch (err) {
  }

};

module.exports.signup = async (req, res) => {
  try {
    var user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [ { username: req.body.username }, { email: req.body.email }]
      }
    });

    if (user) {
      return res.sendStatus(400)
    }

    user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    await redis.setAsync(user.id, JSON.stringify({ user: {
      username: user.username,  password: user.password, id: user.id
    } }));

    res.json({ userId: user.id });

  } catch (err) {
    res.sendStatus(500);

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
      return res.sendStatus(401);
    }

    await redis.setAsync(user.id, JSON.stringify({ user: user.get() }) );

    res.json({ userId: user.id })

  } catch (err) {
    res.sendStatus(500);

  }
}

/* ============= Tweets ============= */

module.exports.tweet = async (req, res) => {
  try {
    res.sendStatus(200);

    await axios.post(tweetServiceURL + '/tweet', {
        content: req.body.content,
        userId: req.user.id,
        parentId: req.body.parentId
    });
  } catch (err) {

  }
};

module.exports.getLikes = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var users = await axios.get(tweetServiceURL + '/likes', {
      data: { id: id }
    });

    res.json(users.data)

  } catch (err) {
  }
};

module.exports.getTweet = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var tweet = await axios.get(tweetServiceURL + '/tweet', {
      data: { id: id }
    });

    res.json(tweet.data);

  } catch (err) {
  }

};

module.exports.getLikes = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var users = await axios.get(tweetServiceURL + '/likes', {
      data: { id: id }
    });

    res.json(users.data)

  } catch (err) {
  }
};

module.exports.getRetweets = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var retweets = await axios.get(tweetServiceURL + '/retweets', {
      data: { id: id }
    });

    res.json(retweets.data)

  } catch (err) {
  }
}

/* ============= Search ============= */

module.exports.search = async (req, res) => {
  try {

    var tweets = await axios.get(searchServiceURL + '/search', {
      data: { term: req.query.search }
    });

    res.json(tweets.data);

  } catch (err) {
  }
};

/* ============= Users ============= */

// Added basic caching to user info and tweets.
module.exports.getUserTweets = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var tweets = await axios.get(tweetServiceURL + '/timeline/user', {
      data: { id: id }
    });

    res.json(tweets.data)

  } catch (err) {
  }
};

module.exports.getUser = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var user = await axios.get(userServiceURL + '/user', {
      data: { id: id }
    });

    res.json(user.data)

  } catch (err) {
  }
};


module.exports.getFollowees = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var followees = await axios.get(userServiceURL + '/followees', {
      data: { id: id }
    });

    res.json(followees.data)

  } catch (err) {
  }

};

module.exports.getFollowers =  async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var followers = await axios.get(userServiceURL + '/followers', {
      data: { id: id }
    });

    res.json(followers.data)

  } catch (err) {
  }
};
