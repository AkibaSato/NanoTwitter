var express = require('express');
var router = express.Router();
let User = require('./test_controllers/test_users');
let Tweet = require('./test_controllers/test_tweets');
var Relationship = require('./test_controllers/test_relationships');
let Follower = require('./test_controllers/test_relationships');
let Loader=require('./data_loader');
const index=require('./test_controllers/test_index');
test_param={fname: "testuser",lname: "testuser", username: "testuser", email: "testuser@sample.com", password: "password"};
var sequelize = require("../models/index").sequelize



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * post request to url/reset/all that deletes all database information and creates testuser with id=1
 */
 router.post('/reset/all',  (req, res, next) => {
   sequelize.sync({force: true}).then(() => {
     resetTestUser(req)
   }, (err) => {
     res.status(404).send(err);
   });
   next();
 });


/**
 * post request to reset/testuser that deletes testuser information and creates new one 
 */
router.post('/reset/testuser', async function (req, res, next) {
  var testuser=await User.findUserFromName(req, res, "testuser");
  if(testuser) {
    var id=testuser['id']
    await User.destroy(id)
    await resetTestUser();
    next();
  } else {
    await resetTestUser();
    next();
  }
  
});

/**
 * gets full page report of database information of test user id, number tweets, number users, number follows
 */
router.get('/status', async function (req, res, next) {
  res.json(await getStatus(req, res));
});

/**
 * gets full page report of version
 */
router.get('/version',  index.version);

/**
 * deletes all db data, resets and loads test data from seed data. If n param for tweests is included, loads n tweets.
 */
router.post('/reset/standard', async function (req, res, next) {
  sequelize.sync({force: true}).then(async () => {
    await Relationship.destroyAll(req, res, next);
    await User.destroyAll(req, res, next);
    await Tweet.destroyAll(req, res, next);
    await Loader.loadData(req, res, req.query['tweets'], req.query['follows'], req.query['follows'])
    await User.create(req, test_param);
    res.sendStatus(200);
    
  }, (err) => {
    res.status(404).send(err);
  });
  
});

/**
  create u (integer) fake Users using faker. Defaults to 1.
  each of those users gets c (integer) fake tweets. Defaults to zero.
  Example: /test/users/create?count=100&tweets=5
**/
//help

router.post('/users/create', function (req, res, next) {
    const count=(req.query['count'] || 1);
    const tweets=(req.query['tweets'] || 0);
    console.log(count);
    console.log(tweets)
    Loader.fakeUserTweet(req, res, count, tweets)
    res.sendStatus(200);
});

/**
 * user u generates t(integer) new fake tweets
 * /test/user/testuser/tweets?tweets=100
 */
router.post('/user/:id/tweets', async function (req, res, next) {
      const tweets=req.query['count']
      var testuser=await User.findUserFromName(req, res, "testuser");
      const id=req.params.id
      if (id=="testuser" && tweets && testuser) {
        Loader.createNTweets(req, res, testuser['id'], tweets);
        res.sendStatus(200)

      } else {
        Loader.createNTweets(req, res, id, tweets)
        res.sendStatus(200)
      }
});
/**
n (integer) randomly selected users follow user u (integer)
if u=”testuser” then this refers to the TestUser
Example: /test/user/22/follow?count=10
**/
//done
router.post('/user/:id/follow', async function (req, res, next) {
  userID=req.params.id
  follows=req.query.count
  if(userID=="testuser") {
    var testuser=await User.findUserFromName(req, res, testuser);

    Loader.randomFollow(req, res, testuser['id'], follows)
  } else {
    Loader.randomFollow(req, res, userID, follows)
  }
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


async function getStatus(req, res) {
  users = await User.getAll() // wait till the promise resolves (*)
  tweets= await Tweet.getAll();
  follows= await Relationship.getAll();
  test_id=await User.findUserFromName(req, res, "testuser")  
  console.log(test_id)
  return await { users: users.length, tweets: tweets.length, follows: follows.length, test_user_id: 1};
};

async function resetAll(req, res, next) {
  Promise.all([Relationship.destroyAll(req, res, next), User.destroyAll(req, res, next), Tweet.destroyAll(req, res, next)]);
}


async function resetTestUser(req) {
 return await User.create(req, test_param)
};
