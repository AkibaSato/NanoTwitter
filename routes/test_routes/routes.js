const User = require('../../controllers/users');
const Tweet = require('../../controllers/tweets');
const Follower = require('../../controllers/relationships');
const Loader=require('../../data_loader')
const testuser=null;


module.exports = function(app){
  // creates new test user and returns json with number users, follows, tweets, and the test user's id
    app.get('/test/status',  function (req, res) {
      const data={fname: "testuser",lname: "testuser", username: "testuser", email: "testuser@sample.com", password: "password"};
      this.testuser=User.create(data);
      console.log("created")
      res.json({
        users: User.getAllCount(),
        follows: Follower.getAllCount(),
        tweets: Tweet.getAllCount(),
        test_user_id: this.testuser.id
    });
  });

  app.get('/test/version',  function (req, res) {
      var config = require('./../../package.json');
      res.json({
        version: config.version
    });
  });

  app.post('/test/reset/all', function (req, res) {
      // TODO: fix the delete All methods that are being tied up
      User.destroyAll()
      Tweet.destroyAll()
      Follower.destroyAll()
      console.log("deleted")
      const data={fname: "testuser",lname: "testuser", username: "testuser", email: "testuser@sample.com", password: "password"};
      u=User.create(data);
      console.log("created")
      res.json({
      });
      // TODO: create test User and fix destory methods
    });

    app.post('/test/reset/testuser', function (req, res) {
      console.log("wow")
      User.destroy({id: this.testuser.id})
      console.log("destoryed")
      const data={fname: "testuser",lname: "testuser", username: "testuser", email: "testuser@sample.com", password: "password"};
      u=User.create(data);
      conosole.log("created")
    });


    app.post('/test/reset/standard', function (req, res) {
//  if contains tweets paramter in url

      if(req.query['tweets']){
        const n=req.query['tweets']
        console.log(n)
        Loader.load_tweets({tweets: n})
      } else {
        console.log("nah fam")
        Loader.load_follows()
        // TODO: load all tweets from seed data
      };

    });

    app.post('/test/users/create', function (req, res) {
      const count=req.query['count']
      const tweets=req.query['tweets']
      if(count && tweets) {
        loader.create_fake(count, tweets)
      } else {
        loader.create_fake(1, 0)
      }
    });

    app.post('/test/user/:id/tweets', function (req, res) {
      console.log(req)
      const tweets=req.query['tweets']
      const id=req.query['id']
      console.log(id)
      if (id==testuser && tweets) {
        const user=testuser
        loader.user_generateTweets(user, count)
      } else if(id && tweets){
        const user=User.getUser(req.params.id)
        loader.user_generateTweets(user, count)
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
