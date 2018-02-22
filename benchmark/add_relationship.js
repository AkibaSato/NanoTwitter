// This benchmarks adding a new follower-followee relationship,
// which requires two-way nested insertion for MongoDB and
// flat insertion into Postgres.

const N_TWEETS_PER_USER = 10
const N_FOLLOW = 10
const N_USERS = 10
const N_REPETITIONS = 10

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/benchmark");

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Tweet = require('./mongoose_schema');
var User = require('./mongoose_schema');
var Hashtag = require('./mongoose_schema');
var Mention = require('./mongoose_schema');

var insertions = {
  mongo: 0,
  pg: 0
}

var total_time = {
  mongo: 0,
  pg: 0
}

function endSession() {
  User.remove({}).exec().then(function(row) {
    console.log("Emptied collection.");
  }).catch(function(err) {
    console.log("Collection couldn't be removed" + err);
  })
  .then(function() {
    console.log("Following of ", N_FOLLOW, " users took an average of ", total_time.mongo /= N_REPETITIONS, " ms")
  })
  .then(function() {
    mongoose.connection.close();
  });
}

var follower_id;
var followee_id;

function main() {
  return new User({name: 'dummy_followee'}).save()
  .then(function(user) {
    followee_id = user._id;
  })
  .then(function(user) {
    return new User({name: "dummy_follower"}).save();
  })
  .then(function(user) {
    follower_id = user._id;
  })
  .then(function(){
    for (var i = 0; i < N_REPETITIONS; ++i) {
      var start = new Date().getTime();
      for (var j = 0; j < N_USERS; ++j) {
        insertAFollower(start);
      }
    }}
  )
  .catch(function(err) {
    console.log(err);
  });

}

function insertAFollower(start) {
  var count = 0;

  User.findById(follower_id, function(err, follower) {
    if (err) {
      console.log("Insertion failed: ", err);
      endSession();
      return;
    }
    follower.followees.push(followee_id);
    follower.save(function(err) {
      if (err) {
        console.log("Insertion failed: ", err);
        endSession();
        return;
      }
      count++;
      if (count == 2) {
        insertions.mongo++;
      }
      if (insertions.mongo % N_FOLLOW == N_FOLLOW - 1) {
        total_time.mongo += new Date().getTime() - start;
      }
      // Close connection at last insertion.
      if (insertions.mongo == N_REPETITIONS * N_FOLLOW) {
        endSession();
      }
    });
  });

  User.findById(followee_id, function(err, followee) {
    if (err) {
      console.log("Insertion failed: ", err);
      endSession();
      return;
    }
    followee.followers.push(follower_id);
    followee.save(function(err) {
      if (err) {
        console.log("Insertion failed: ", err);
        endSession();
        return;
      }
      count++;
      if (count == 2) {
        insertions.mongo++;
      }
      if (insertions.mongo % N_FOLLOW == N_FOLLOW - 1) {
        total_time.mongo += new Date().getTime() - start;
      }
      // Close connection at last insertion.
      if (insertions.mongo == N_REPETITIONS * N_FOLLOW) {
        endSession();
      }
    });
  });
}

main();
