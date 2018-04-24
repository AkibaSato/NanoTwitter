var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service
var async=require('async')
var axios = require('axios')
// var redis = require("redis")
// var REDIS_PORT = process.env.REDISCLOUD_URL || process.env.REDIS_PORT;
// var client = redis.createClient(REDIS_PORT);

module.exports.index = async (req, res) => {
  //   var timeline
  //   var user
  //
  //   client.get('homeHTML', async function (err, data) {
  //     if(err) {
  //       res.send(err)
  //     } else if(!data) {
  //       if (req.user) {
  //         var getUser = axios.get(userServiceURL + '/user', {
  //           data: { id: req.user.id }
  //         });
  //         // If you are logged in, you see tweets from the people you follow.
  //         var getTimeline = axios.get(tweetServiceURL + '/timeline/followees', {
  //           data: { id: req.user.id }
  //         });
  //         var [userData, timelineData] = await axios.all([getUser, getTimeline]);
  //         req.user = userData.data
  //         timeline = timelineData
  //       } else {
  //         // If you are not, you see the most recent tweets from randos.
  //         timeline = await axios.get(tweetServiceURL + '/timeline/global', {});
  //       }
  //
  //       res.render('index', {
  //         me: req.user, user: req.user, tweets: timeline.data
  //       }, function(err, html){
  //         client.set('homeHTML', html, function(err, data){
  //             if(err) {
  //               res.send(err)
  //             } else {
  //               res.send(html);
  //             }
  //           })
  //       })
  //     } else {
  //       res.send(data);
  //     }
  // })
  res.render('index', {
      me: req.user, user: req.user, tweets: [
          {
              "content": "hello",
              "createdAt": "2018-04-06T03:10:04.011Z",
              "user": {
                  "fullName": "yoyo yoyo",
                  "id": 1,
                  "username": "yoyo",
                  "fname": "yoyo",
                  "lname": "yoyo"
              }
          }
        ]}
      )



};
