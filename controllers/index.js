var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service

var redis = require('../config/redis');

var axios = require('axios')

module.exports.index = async (req, res) => {

  try {
    var timeline
    var user

    // res.render('index', {
    //   me: req.user, user: req.user, tweets: [
    //       {
    //           "id": 18,
    //           "content": "hi",
    //           "createdAt": "2018-04-06T03:10:04.011Z",
    //           "user": {
    //               "fullName": "yoyo yoyo",
    //               "id": 1,
    //               "username": "yoyo"
    //           }
    //       }
    //   ], API_TOKEN: req.API_TOKEN
    // })
    // res.json({});


    var callback

    if (req.user) {
      var html = await redis.getAsync('userHTML:' + req.user.id);

      console.log("INDEX USER");

      if (html) {
        console.log("USING CACHED USER");
        return res.send(html)
      }

      var getUser = axios.get(userServiceURL + '/user', {
        data: { id: req.user.id }
      }, console.log("GOT INDEX USER"));
      //
      // // If you are logged in, you see tweets from the people you follow.
      var getTimeline = axios.get(tweetServiceURL + '/timeline/followees', {
        data: { id: req.user.id }
      }, console.log("GOT INDEX TIMELINE"));



      var [userData, timelineData] = await axios.all([getUser, getTimeline]);

      req.user = userData.data;
      timeline = timelineData;


      // var [userData, timelineData, timeline2Data] = await axios.all([getUser, getTimeline, getTimeLine2]);


      // callback = (err, html) => { redis.set('userHTML:' + req.user.id, html) }
      redis.set('userHTML:' + req.user.id, html);


    } else {
      var html = await redis.getAsync('homeHTML');


      console.log("INDEX GLOBAL");

      if (html) {
        console.log("USING CACHED GLOBAL");
        return res.send(html);
      }

      // If you are not, you see the most recent tweets from randos.
       timeline = await axios.get(tweetServiceURL + '/timeline/global', {});

       if (timeline) {
         console.log("GLOBAL TIMELINE")
         console.log(timeline.length);
       }

       redis.set('homeHTML', html);

       // callback = (err, html) => { redis.set('homeHTML', html), console.log('error in function xyz:', err, 'whilst doing abc')}
       console.log("POST GLOBAL CALLBACK");
    }

    res.render('index', {
      // me: req.user, user: req.user, tweets: timeline.data, tweets3: timeline2.data }, callback)

      // me: req.user, user: req.user, tweets: timeline.data })
      me: req.user, user: req.user, tweets: timeline.data }, callback)

  } catch (err) {
    res.status(404).send(err)
  }
};

module.exports.getGlobalTimeline =  async (req, res) => {
  try {

    var globalTimeline = await redis.getAsync('globalTimeline');

    if (globalTimeline) {
      console.log("USING CACHED GLOBAL");
      return res.send(globalTimeline);
    }
    timeline = await axios.get(tweetServiceURL + '/timeline/global', {});
    redis.set('globalTimeline', globalTimeline);

    // res.json({tweets: timeline.data});
    res.render('components/tweets3', {
      tweets3: timeline.data
    });

  } catch (err) {

  }
};

module.exports.getFolloweesTimeline =  async (req, res) => {
  try {

    var followeesTimeline = await redis.getAsync('followeesTimeline');

    if (followeesTimeline) {
      return res.send(followeesTimeline);
    }

    var getUser = axios.get(userServiceURL + '/user', {
      data: { id: req.user.id }
    }, console.log("GOT INDEX USER"));
    //
    // // If you are logged in, you see tweets from the people you follow.
    var getTimeline = axios.get(tweetServiceURL + '/timeline/followees', {
      data: { id: req.user.id }
    }, console.log("GOT INDEX TIMELINE"));



    var [userData, timelineData] = await axios.all([getUser, getTimeline]);

    req.user = userData.data;
    timeline = timelineData;
    redis.set('followeesTimeline', followeesTimeline);

    // res.json({tweets: timeline.data});
    res.render('components/tweets', {
      tweets: timeline.data
    });

  } catch (err) {

  }
};
