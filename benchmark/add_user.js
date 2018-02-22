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

function createInsertionCallback(start) {
  return function(err) {
    if (err) {
      console.log("Insertion failed: ", err);
      endSession();
      return;
    }
    insertions.mongo++;
    if (insertions.mongo % N_USERS == N_USERS - 1) {
      console.log("At ", insertions.mongo, " insertions start time is ", start);
      total_time.mongo += new Date().getTime() - start;
    }
    if (insertions.mongo == N_REPETITIONS * N_USERS) {
      console.log("Creation of ", N_USERS, " users took an average of ", total_time.mongo /= N_REPETITIONS, " ms");
      endSession();
    }
  }
}

function endSession() {
  User.remove({}).exec().then(function(row) {
    console.log("Emptied collection.");
  }).catch(function(err) {
    console.log("Collection couldn't be removed" + err);
  }).then(function() {
    mongoose.connection.close();
  });
}

function main() {
  for (var i = 0; i < N_REPETITIONS; ++i) {
    var start = new Date().getTime();
    for (var j = 0; j < N_USERS; ++j) {
      new User().save(createInsertionCallback(start));
    }
  }
}

main();


// Creating new user, i.e. flat insertion.
