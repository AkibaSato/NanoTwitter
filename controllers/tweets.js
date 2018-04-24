var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service

var axios = require('axios')


// TODO: Parse tweet content in background and insert into Hashtag and Mention.
module.exports.tweet = async (req, res) => {
  try {
    res.redirect('/user/' + req.user.id);

    console.log("Entered")
    console.log(req)
    console.log(req.user.id)

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
      me: req.user,
      tweet: tweet.data
    });
  } catch (err) {
    res.status(404).send(err)
  }

};

module.exports.like = async (req, res) => {

  console.log("TEST TEST TEST");



  try {

    res.redirect('/user/' + req.user.id);

    var tweetId = parseInt(req.params.id);
    var userId = parseInt(req.user.id);

    console.log("TWEET ID: " + tweetId);
    console.log("USER ID: " + userId);



    if (isNaN(userId)) {
      console.log("ID ERROR")
      throw new Error("NaN parameter");
    }

    await axios.post(tweetServiceURL + '/like', {
      userId: userId,
      tweetId: tweetId
    });
  } catch (err) {

  }
};

module.exports.unlike = async (req, res) => {
  try {
    var tweetId = parseInt(req.params.id);
    var userId = parseInt(req.user.id);

    res.redirect('/user/' + req.user.id);


    if (isNaN(userId)) {
      throw new Error("NaN parameter");
    }

    await axios.post(tweetServiceURL + '/unlike', {
      userId: userId,
      tweetId: tweetId
    });
  } catch (err) {

  }
};

module.exports.getLikes = async (req, res) => {

  console.log("GET LIKES");

  try {
    var id = parseInt(req.params.id);

    console.log("GET LIKES2");


    if (isNaN(id)) {
      throw new Error("NaN parameter");
    }

    var likes = await axios.get(tweetServiceURL + '/likes', {
      data: { id: id }
    });


    res.render('likes', { me: req.user, user: req.user, users: likes.data })

  } catch (err) {
    res.status(404).send(err)
  }
};

module.exports.retweet = async (req, res) => {
  try {

    res.redirect('/user/' + req.user.id);

    console.log("CONTENT: " + content);

    var tweetId = parseInt(req.params.id);
    var userId = parseInt(req.user.id);
    var content = req.body.content;


    console.log("CONTENT: " + content);



    if (isNaN(userId)) {
      throw new Error("NaN parameter");
    }
    console.log("TWEET ID: " + tweetId);
    console.log("USER ID: " + userId);
    console.log("CONTENT: " + content);


    await axios.post(tweetServiceURL + '/retweet', {
      userId: userId,
      tweetId: tweetId,
      content: content
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

    res.render('retweets', { me: req.user, user: req.user, retweets: retweets.data, API_TOKEN: req.API_TOKEN });

  } catch (err) {
    res.status(404).send(err)
  }
}
