var express = require('express');
var router = express.Router();
let User = require('./test_controllers/test_users');
let Tweet = require('./test_controllers/test_tweets');
var Relationship = require('./test_controllers/test_relationships');
let Follower = require('./test_controllers/test_relationships');
let Loader=require('./data_loader');
testuser=null;
const index=require('./test_controllers/test_index');
test_param={fname: "testuser",lname: "testuser", username: "testuser", email: "testuser@sample.com", password: "password"};
test_id=-1;


 //DONE
router.post('/reset/all',  async function (req, res, next) {
   resetAll(req, res, next)
   resetTestUser(req)
   res.json({})
});

//DONE
router.post('/reset/testuser', async function (req, res, next) {
  if(testuser!=null) {
    User.destroy(testuser['id'])
    testuser=null
  }
  await resetTestUser();
  next();

});

//DONE
router.get('/status', async function (req, res, next) {
  res.json(await getStatus(req.id));
});

//DONE
router.get('/version',  index.version);

/**
  If tweets parameter is included, only load n tweets from seed data, otherwise load all
  Imports the complete set of standard seed data, see: Seed Data
**/
// NEED TO FIXX
router.post('/reset/standard', function (req, res, next) {
  resetAll().then(function(data){
    Loader.loadData(req, res, req.query['tweets'])
    next();

  })


  // if(tweetN) {
  //   await Loader.loadTweets(req,res, tweetN);
  // } else {
  //   await Loader.loadTweets(req, res);
  // }
});

/**
create u (integer) fake Users using faker. Defaults to 1.
each of those users gets c (integer) fake tweets. Defaults to zero.
Example: /test/users/create?count=100&tweets=5
**/

// DONE
router.post('/users/create', function (req, res, next) {
    const count=(req.query['count'] || 1);
    const tweets=(req.query['tweets'] || 0);
    Loader.fakeUserTweet(req, res, count, tweets)
    next();
});

/**
user u generates t(integer) new fake tweets
if u=”testuser” then this refers to the TestUser
**/
//done
router.post('/user/:id/tweets', function (req, res, next) {
      const tweets=req.query.count
      const id=req.params.id
      if (id=="testuser" && tweets) {
        Loader.createNTweets(req, res, testuser['id'], tweets);
      } else {
        Loader.createNTweets(req, res, id, tweets)
      }

});
/**
n (integer) randomly selected users follow user u (integer)
if u=”testuser” then this refers to the TestUser
Example: /test/user/22/follow?count=10
**/
//done
router.post('/user/:id/follow', function (req, res, next) {
  userID=req.params.id
  follows=req.query.count
  if(userID=="testuser") {
    console.log(follows)
    Loader.randomFollow(req, res, testuser['id'], follows)

  } else {}
  next();
});


/**
n (integer) randomly selected users follow ‘n’ (integer) different randomlt seleted users.
Example: /test/user/follow?count=10
**/
router.post('/user/follow', function (req, res, next) {
    const numToFollow=req.query['count']
    Loader.randomNFollowN(req, res, numToFollow)
    next();

});

module.exports=router;


async function getStatus() {
  users = await User.getAll() // wait till the promise resolves (*)
  tweets= await Tweet.getAll();
  follows= await Relationship.getAll();
  return await { users: users.length, tweets: tweets.length, follows: follows.length, test_user_id: test_id};
};

async function resetAll(req, res, next) {
  User.destroyAll(req, res, next);
  Tweet.destroyAll(req, res, next);
  Relationship.destroyAll(req, res, next);
};


async function resetTestUser(req) {
 testuser=await User.create(req, test_param)
 test_id=testuser['id']
 process.env.testuser=testuser
 process.env.testid=test_id

 return testuser;
};
