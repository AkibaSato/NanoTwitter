const fs = require('fs');
const faker=require('faker');


module.exports.load_tweets=function(req, res, next) {
  fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
    const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    var size=0;
    const users=req.count;
    const tweets=req.tweets;
    start=0;
    for(i=0; i<users; i++) {
        const data={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
        //TODO: create user based on data
        end=start+tweets;
        for(start; start<end; start++) {
            line=dataArray[start].split(',');
            const user_id=line[0];
            const content=line[1];
            const date=line[2];
            console.log(line);
        //TODO: create tweet and asociate with suer
        }
    }
  });
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
