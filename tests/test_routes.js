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

 //DONE
router.post('/reset/all', function (req, res, next) {
  resetAll(req, res, next)
  user=resetTestUser(req, res, next)
  res.json({})
});

//DONE
router.post('/reset/testuser', function (req, res, next) {
  if(testuser) {
    testuser.then(function(value) {
    req.id=JSON.parse(value)['id']
    User.destroy(req, res, next);
    resetTestUser(req, res, next);
  });
  }
  res.json({})
});

//DONE
router.get('/status', async function (req, res, next) {
  res.json(await getStatus(req.id));
});

//DONE
router.get('/version',  index.version);

// DONE
router.post('/reset/standard', function (req, res, next) {
  resetAll(req, res, next);
  resetTestUser(req, res, next);
  tweetN=req.query['tweets']
  if(tweetN) req.tweetN=tweetN
  testuser.then(function(value){
    req.params.id=value['id']
      if(req.query['tweets']){ req.tweets=req.query['tweets']}
      Loader.generateTweets(req, res, next)
    });
});



// DONE
router.post('/users/create', function (req, res, next) {
    const count=req.query['count'];
    const tweets=req.query['tweets'];
    if(count && tweets) {
      req.count=count
      req.tweets=tweets
      Loader.fakeUserTweet(req, res, next)
    } else {
      req.count=1
      req.tweets=0
      Loader.fakeUserTweet(req, res, next)
    }
});

router.post('/user/:id/tweets', function (req, res, next) {
      const tweets=req.query['tweets']
      const id=req.params.id
      if (id==testuser && tweets) {
        req.tweets=tweets
        req.params.id=testuser['id']
        loader.randomUserTweet(req, res, next)
      } else if(id && tweets){
        req.tweets=tweets
        req.params.id=id
        Loader.randomUserTweet(req, res, next)
      }
});


router.post('/user/:id/follow', function (req, res, next) {
  req.params.limit=req.query['count']
  Loader.randomFollow(req, res, next)
});



router.post('/user/follow', function (req, res, next) {
    const n=req.query['count']
    req.params.limit=req.query['count']
    req.params.n=n
    req.params.limit=n
    Loader.numberFollow(req, res, next)
});



module.exports=router;




async function getStatus() {
  users = await User.getAll() // wait till the promise resolves (*)
  tweets= await Tweet.getAll();
  follows= await Relationship.getAll();
  if(testuser) id=testuser['id']
  else id=-1
  return await {
      users: users.length,
      tweets: tweets.length,
      follows: follows.length,
      test_user_id: id
  };
}

async function fakeUsers() {
  return await User.getAll() // wait till the promise resolves (*)

}

function resetAll(req, res, next) {

  User.destroyAll(req, res, next);
  Tweet.destroyAll(req, res, next);
  Relationship.destoryAll(req, res, next);
};

function resetTestUser(req, res, next) {
  req.user=test_param;
  user=User.create(req, res, next)
  testuser=user
};
