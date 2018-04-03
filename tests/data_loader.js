const fs = require('fs');
const faker=require('faker');
User=require('./test_controllers/test_users')
Tweet=require('./test_controllers/test_tweets')


module.exports.generateTweets= async function(req, res, next) {
  fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
    const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    if(req.tweetN) size=req.tweetN
    else size=dataArray.length
    for(i=0; i<size; i++) {
      line=dataArray[i]
      req.body.content=line[0]
      req.user.id=line[0]
      t=  Tweet.generate(req, res, next);
    }
  });
};


module.exports.fakeUserTweet = async function (req, res, next) {
  for(i=0; i<req.count; i++) {
    req.user={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
    user=await User.create(req, res, next)
    console.log(user)
    u_id=user['id']
    fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
      const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
      for(j=0; j<req.tweets; j++) {
        line=dataArray[j]
        req.body.content=line[0]
        req.user.id=u_id
        t= Tweet.generate(req, res, next);
        console.log(t)
      }
    });
  };
  res.json({})

};


module.exports.randomUserTweet = async function (req, res, next) {
  toFollow= await User.getUser(req, res, next)
  console.log(toFollow)
  u_id=toFollow['id']
  req.user=req.params
  req.user.id=u_id
  console.log(req.user)
  for(i=0; i<req.tweets; i++) {
    fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
      const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
      for(i=0; i<req.tweets; i++) {
        line=dataArray[i]
        req.body.content=line[0]
        Tweet.generate(req, res, next);
      }
    });
  };
};


module.exports.randomFollow=async function(req, res, next){
  toFollow= await User.getUser(req, res, next)
  random=await User.randomUser(req, res, next)
  for(i=0; i<random.length; i++) {
    r_user=random[i];
    req.params.follow_id=r_user['id']
    User.followUser(req, res, next)

  }
};

module.exports.numberFollow = async function (req, res, next) {
  num=req.params.n
  req.params.id=-1
  random=await User.randomUser(req, res, next)
  for(i=0; i<random.length; i++) {
    user_id=random[i]['id']
    console.log(user_id)
    req.params.id=user_id
    toFollow=await User.randomUser(req, res, next)
    for( j=0; j<toFollow.length; j++) {
      follow_user_id=toFollowa[j]['id']
      console.log(follow_user_id)
      req.params.id=follow_user_id
      req.params.follow_id=user_id
      User.followUser(req, res, next)
    }
  }

  // n users follow n users
  // body...
};

// module.exports.fakeUserTweet=async function(req, res, next) {
//   fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
//     const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
//     const users=req.count;
//     const tweets=req.tweets;
//     for(i=0; i<users; i++) {
//       const data={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
//       users= await User.getAll() // wait till the promise resolves (*)
//
//       ids=[]
//       req.user=data
//       user=User.create(req, res, next)
//       user.then(function(value) {
//         req.user=JSON.parse(value);
//         while(count<tweets) {
//             num=Math.random(tweets)
//             if(!ids.contains(num)) {
//               ids.push(num);
//               count++;
//             };
//         };
//         Alltweets=[]
//         for(i=0; i<ids.length; i++) {
//           line=dataArray[start].split(',');
//           const user_id=line[0];
//           const content=line[1];
//           const date=line[2];
//           Alltweets.push({content: content, userId: JSON.parse(value)['id']})
//         };
//         req.tweets=Alltweets
//         Tweet.bulkTweet(req, res, next)
//       });
//     }
//   });
// };


module.exports.add_tweets = function (req, res, next) {
  const newUser=User.getUserID(req, res, next);
  tweets=req.tweets
  fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
    const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    if(req.tweets) {
      tweets=req.tweets
    } else {
      tweets=dataArray.length
    }
    newUser.then(function(value) {
      Alltweets=[]
      for(i=0; i<tweets; i++) {
        line=dataArray[i].split(',');
        const content=line[1];
        const date=line[2];
        console.log({content: content, userId: value.id})
        Alltweets.push({content: content, userId: value.id})
      };
      req.tweets=Alltweets
      Tweet.bulkTweet(req, res, next)
    })
  })
};

module.exports.load_follows=function(req, res, next) {
    fs.readFile('./seeds/follows.csv', 'utf8', function (err, data) {
        const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
        dataArray.forEach(function(element) {
            // assume user 1 follows user2?
            line=element.split(',');
            const user1=line[0];
            const user2=line[1]
        });
    });
};





module.exports.load_users=function(req, res, next){
  const fs = require('fs')
  fs.readFile('./seeds/users.csv', 'utf8', function (err, data) {
    const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    dataArray.forEach(function(element) {
      line=element.split(',')
      const id=line[0]
      const name=line[1]
    });
  })
};


// Using Faker, generate n users each with
// n users, n tweets
module.exports.load_fake=function(req, res, next) {
  n_user=req.n_user;
  n_tweets=req.n_twets;
};
// user u generates t(integer) new fake tweets
module.exports.user_generateTweets=function(req, res, next) {
  n_user=req.n_user;
  n_tweets=req.n_twets;
};


function getModel(model) {

}
