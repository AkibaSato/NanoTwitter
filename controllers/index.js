var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var tweetServiceURL = config.tweet_service
var userServiceURL = config.user_service
var async=require('async')
var axios = require('axios')
var client = require("../config/redis.js")




module.exports.index = async (req, res) => {
  console.log("INDEX")
    var timeline, user, key, rendered;
  
    if (req.user) {
      key='homeLoginHTML'+req.user.id;
      var homePage=await client.getAsync(key);
      if(homePage) {

        rendered=true;
        res.send(homePage)
      } else {

        var getUser = axios.get(userServiceURL + '/user', {data: { id: req.user.id }});
        // If you are logged in, you see tweets from the people you follow.
        var getTimeline = axios.get(tweetServiceURL + '/timeline/followees', {data: { id: req.user.id }});
        var [userData, timelineData] = await axios.all([getUser, getTimeline]);
        req.user = userData.data
        timeline = timelineData
        res.render('index', {
          me: req.user, user: req.user, tweets: timeline.data, API_TOKEN: req.API_TOKEN
        }, async function(err, htmlResponse){
          
          // sets hompage expiration for 60 seconds
          await client.setAsync(key, htmlResponse, 'EX', 60);
          res.send(htmlResponse);
        });
      }
    } else {
      key="nonLoggeedIn"
      var homePage=await client.getAsync(key);
      if(homePage) {
        res.send(homePage)        
      } else {
            
        timeline = await axios.get(tweetServiceURL + '/timeline/global', {});
        res.render('index', {
          me: req.user, user: req.user, tweets: timeline.data, API_TOKEN: req.API_TOKEN
        }, async function(err, htmlResponse){
          
          // sets hompage expiration for 60 seconds
          await client.set(key, htmlResponse, 'EX', 60);
          res.send(htmlResponse);
        });
      }
    }  
};


