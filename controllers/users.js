var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service

var axios = require('axios');

module.exports.getSignup = (req, res) => {
  res.render('signup');
};

module.exports.follow = async (req, res) => {
  try {
    var followeeId = parseInt(req.params.id);
    var followerId = req.user.id;

    res.redirect('/api/v1/' + req.API_TOKEN + '/user/' + followeeId);

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

    res.redirect('/api/v1/' + req.API_TOKEN + '/user/' + followeeId);

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
  console.log("GET USERR")
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var getUser = axios.get(userServiceURL + '/user', {
      data: { id: id }
    });
    console.log("getting i")
    console.log(id)
    var getTweets = axios.get(tweetServiceURL + '/timeline/user', {
      data: { id: id }
    });

    console.log(getTweets.data)

    var [userData, tweetsData] = await axios.all([getUser, getTweets]);

    res.render('user', {
      user: userData.data, tweets: tweetsData.data, me: req.user, API_TOKEN: req.API_TOKEN
    });

  } catch (err) {
    res.status(404).send(err)
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
      user: userData.data, tweets: tweetsData.data, me: req.user, API_TOKEN: req.API_TOKEN
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
      user: userData.data, followees: followerData.data , me: req.user, API_TOKEN: req.API_TOKEN
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
      user: userData.data, followers: followerData.data , me: req.user, API_TOKEN: req.API_TOKEN
    })
  } catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
};
