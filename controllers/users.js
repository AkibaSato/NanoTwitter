var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service
var client = require('../config/redis')

var axios = require('axios');
var redis = require("redis")
var REDIS_PORT = process.env.REDISCLOUD_URL || process.env.REDIS_PORT;
var client = redis.createClient(REDIS_PORT);

module.exports.getSignup = (req, res) => {
  res.render('signup');
};

module.exports.follow = async (req, res) => {
  try {
    var followeeId = parseInt(req.params.id);
    var followerId = req.user.id;

    res.redirect('/user/' + followeeId);

    if (isNaN(followeeId)) {
      throw new Error("NaN parameter");
    }

    if(followeeId === followerId) {
      throw new Error("Can't follow myself");
    }

    await axios.post(userServiceURL + '/follow', {
      followerId: followerId,
      followeeId: followeeId
    });
  } catch (err) {

  }
};

module.exports.unfollow = async (req, res) => {
  try {
    var followeeId = parseInt(req.params.id);
    var followerId = req.user.id;

    res.redirect('/user/' + followeeId);

    if (isNaN(followeeId)) {
      throw new Error("NaN parameter");
    }

    if(followeeId === followerId) {
      throw new Error("Can't unfollow myself");
    }

    await axios.post(userServiceURL + '/unfollow', {
      followerId: followerId,
      followeeId: followeeId
    });
  } catch (err) {

  }

};

// Added basic caching to user info and tweets.
module.exports.getUser = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var key

    if (req.user) {
      key = 'INuserpageHTML:' + id
    } else {
      key = 'OUTuserpageHTML:' + id
    }

    client.get(key, async (err, html) => {
      if (err) {
        return res.send(err)
      }
      if (html) {
        return res.send(html)
      }

      var getUser = axios.get(userServiceURL + '/user', {
        data: { id: id }
      });
      var getTweets = axios.get(tweetServiceURL + '/timeline/user', {
        data: { id: id }
      });

      var [userData, tweetsData] = await axios.all([getUser, getTweets]);

      res.render('user', {
        user: userData.data, tweets: tweetsData.data, me: req.user
      }, (err, html) => {
        try {
          client.set(key, html, 'EX', 60)
          res.send(html)
        } catch (e) {
          console.log(e)
        }

      });

    })

  } catch (err) {
    console.log(err)
  }
};

// Get tweets from the people that the user follows.
module.exports.getFolloweeTweets = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var getUser = axios.get(userServiceURL + '/user', {
      data: { id: id }
    });

    var getTweets = axios.get(tweetServiceURL + '/timeline/followees', {
      data: { id: id }
    });

    var [userData, tweetsData] = await axios.all([getUser, getTweets]);

    res.render('followee_tweets', {
      user: userData.data, tweets: tweetsData.data, me: req.user
    })
  } catch (err) {
    res.status(404).send(err)
  }
};

module.exports.getFollowees = async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var getUser = axios.get(userServiceURL + '/user', {
      data: { id: id }
    });

    var getFollowees = axios.get(userServiceURL + '/followees', {
      data: { id: id }
    });

    var [userData, followerData] = await axios.all([getUser, getFollowees]);


    res.render('following', {
      user: userData.data, followees: followerData.data , me: req.user
    });
  } catch (err) {
    res.status(404).send(err)
  }

};

module.exports.getFollowers =  async (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var getUser = axios.get(userServiceURL + '/user', {
      data: { id: id }
    });

    var getFollowers = axios.get(userServiceURL + '/followers', {
      data: { id: id }
    });

    var [userData, followerData] = await axios.all([getUser, getFollowers]);

    res.render('followers', {
      user: userData.data, followers: followerData.data , me: req.user
    })
  } catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
};
