const fs = require('fs');
const faker=require('faker');
User=require('./test_controllers/test_users')
Tweet=require('./test_controllers/test_tweets')
Follows=require('./test_controllers/test_relationships')


module.exports.loadTweets=async function(req, res, tweets_num) {
};

module.exports.loadData=async function(req, res, tweets_num) {
  allUsers=[];
  allTweets=[];
  allFollows=[];
  var module_export=this;
  await fs.readFile('./seeds/users.csv', 'utf8', async function (err, data) {
    const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    var size  = dataArray.length;
    for(i=0; i<size && dataArray[i]; i++) {
      dataLine=dataArray[i].split(",")
      data={id: parseInt(dataLine[0]), fname: dataLine[1].trim(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
      allUsers.push(data);
    };
    await fs.readFile('./seeds/tweets.csv', 'utf8', async function (err, data) {
      const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
      var size  = (tweets_num || dataArray.length);
      for(i=0; i<size && dataArray[i]; i++) {
        dataLine=dataArray[i].split(",")
        data={id: parseInt(dataLine[0]), fname: dataLine[1].trim(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
        allTweets.push(data);
      };
    });
    await fs.readFile('./seeds/follows.csv', 'utf8', async function (err, data) {
      const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
      var size  = dataArray.length;
      for(i=0; i<size && dataArray[i]; i++) {
        dataLine=dataArray[i].split(",")
        followerID=parseInt(dataLine[0])
        followingID=parseInt(dataLine[1])
        var data = {followerId: followerID,  followeeId: followingID  }
        allFollows.push(data);
      };
    });
      await User.bulkGenerate(res, allUsers);
      await Tweet.bulkTweet(res, allUsers);
      await Follows.bulkFollow(res, allFollows)
  });
};



module.exports.fakeUserTweet = async function (req, res, users, tweets) {
  userData=[];
  for(i=0; i<users; i++) {
    userData.push({fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()});
  }
  allUsers=await User.bulkCreate(req, userData)
  for(i=0; i<users; i++) {
    u_id=allUsers[i]['id']
    fs.readFile('./seeds/tweets.csv', 'utf8', function (err, data) {
      const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
      allTweets=[];
      for(j=0; j<tweets; j++) {
        line=dataArray[j].split(",");
        allTweets.push({content: line[1], userId: u_id})
      };
      t= Tweet.bulkTweet(req, allTweets);
    });
  };
  res.json({})
};

module.exports.createNTweets= async function(req, res, userID, tweets) {
  user= await User.getUser(req, res, userID)
  userID= user['id']
    fs.readFile('./seeds/tweets.csv', 'utf8', async function (err, data) {
      const dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
      for(i=0; i<tweets; i++) {
        line=dataArray[i].split(",");
        data={userId: userID, content: line[1]};
        await Tweet.generate(req, data);
      }
    });

};



module.exports.randomFollow=async function(req, res, userID, follows){
  randomUsers=await User.randomUser(req, res, follows, userID)
  for(i=0; i<randomUsers.length; i++) {
    user=randomUsers[i];
    followerId=user['id'];
    User.followUser(req, res, userID, followerId)
  }
};


module.exports.randomNFollowN = async function (req, res, numToFollow) {
  followingUsers=await User.randomUser(req, res, numToFollow, -1)
  for(i=0; i<followingUsers.length; i++) {
    userID=parseInt(followingUsers[i]['id'])
    followerUsers=await User.randomUser(req, res, numToFollow, userID)
    for(j=0; j<followerUsers.length; j++) {
      followerID=parseInt(followerUsers[j]['id'])
      User.followUser(req, res, userID, followerID)
    }
  }
};
