var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service

var axios = require('axios')


// TODO: Parse tweet content in background and insert into Hashtag and Mention.
module.exports.tweet = async (req, res) => {
  try {
    res.redirect('/user/' + req.user.id);

    await axios.post(tweetServiceURL + '/tweet', {
        content: req.body.content,
        userId: req.user.id,
        parentId: req.body.parentId
    });
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

    res.render('tweet', {
      tweet: tweet.data,
    });
  } catch (err) {
    res.status(404).send(err)
  }

};

module.exports.like = async (req, res) => {
  try {
    res.redirect('/user/' + req.user.id);

    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    await axios.post(tweetServiceURL + '/like', {
      userId: req.user.id,
      tweetId: id
    });
  } catch (err) {

   }
};

module.exports.unlike = async (req, res) => {
  try {
    res.redirect('/user/' + req.user.id);

    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    await axios.post(tweetServiceURL + '/unlike', {
      userId: req.user.id,
      tweetId: id
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

    res.render('likes', { user: req.user, users: users })

  } catch (err) {
    res.status(404).send(err)
  }
};

module.exports.retweet = async (req, res) => {
  try {
    res.redirect('/user/' + req.user.id);

    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    await axios.post(tweetServiceURL + '/retweet', {
      userId: req.user.id,
      tweetId: id
    });
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

    res.render('retweets', { user: req.user, retweets: retweets });

  } catch (err) {
    res.status(404).send(err)
  }
}
