const User = require('../../controllers/users');
const Tweet = require('../../controllers/tweets');
const Follower = require('../../controllers/relationships');
const faker=require('faker')
module.exports = function(app){
  // TODO:add test User and id

    app.get('/test/status',  function (req, res) {
      res.json({
        users: User.getAllCount(),
        follows: Follower.getAllCount(),
        tweets: Tweet.getAllCount(),
        test_user_id: 2
    });
  });

    app.get('/test/version',  function (req, res) {
      var config = require('./../../package.json');
      res.json({
        version: config.version
    });
  });

    app.post('/test/reset/all', function (req, res) {
      // TODO: deleteions being tied up
      User.destroyAll()
      Tweet.destroyAll()
      Follower.destroyAll()

      // TODO: create test User
    });
    app.post('/test/reset/testuser', function (req, res) {
      var config = require('./../../package.json');
      res.send({
        version: config.version
    });
      // TODO: Deletes and recreates TestUser, including all his tweets, follows, and removes him from any other users’ follow list.

    });

    app.post('/test/reset/standard', function (req, res) {

//  if contains tweets paramter in url
      if(req.query['tweets']){
        const n=req.query['tweets']

        // TODO: load n tweets from seed data
        console.log(n)
      } else {
        // TODO: load all tweets from seed data
      };

    });

    app.post('/test/users/create', function (req, res) {
      const count=req.query['count']
      const tweets=req.query['tweets']
      if(count && tweets) {
        console.log(count)
        console.log(tweets)

        // TODO: create u fake users defaults to 1. Each user gets c fake tweets

      }
      // create u (integer) fake Users using faker. Defaults to 1.
      // each of those users gets c (integer) fake tweets. Defaults to zero.
      // Example: /test/users/create?count=100&tweets=5
    });
    app.post('/test/user/:id/tweets', function (req, res) {
      const count=req.query['count']
      if (count) {
        // user u generates t(integer) new fake tweets
        // if u=”testuser” then this refers to the TestUser
        // Example: /test/user/testuser/tweets?tweets=100
      }
    });

    app.post('/test/user/:id/follow', function (req, res) {
      const f_count=req.query['count']
      const id=req.params.id

      if (f_count) {
        const size=User.getAllCount
        followee=User.getUser(id)
        ids=[]
        const curr_num=0;
        while (curr_num<f_count) {
          current_id=Math.getRandomInt(size)
          if(!ids.contains(current_id)) {
            follower=User.getUser(current_id)
            follower.follow(current_id)
            ids.append(current_id)
            curr_num++;
          }
        }
        // TODO: random n number users follow user u
      }
    });

    app.post('/test/user/follow', function (req, res) {
      const count=req.query['count']
      if(count) {
        const user_count=Math.getRandomInt(count)

        // TODO: n randomly selected users follow ‘n’ (integer) different randomlt seleted users.

      }


    });

}
