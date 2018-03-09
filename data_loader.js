const fs = require('fs')
const faker=require('faker')


module.exports.load_tweets=function(req, res, next) {
  fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
    const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    var size=0
    console.log(req)
    if(req.n) { size=req.n}
    else { size=dataArray.length }
    // creates n users

    // this.module.exports.create_n_users(n)

    for (i = 0; i < size-1; i++) {
      line=dataArray[i].split(',')
      const user_id=line[0]
      const content=line[1]
      const date=line[2]
      const f_name=faker.name.first
      User.create({id: user_id, faker})

    };
  });
};

function load_follows() {
  fs.readFile('./seeds/follows.csv', 'utf8', function (err, data) {
    const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    dataArray.forEach(function(element) {
      // assume user 1 follows user2?
      line=element.split(',')
      const user1=line[0]
      const user2=line[1]

    });
  })
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
