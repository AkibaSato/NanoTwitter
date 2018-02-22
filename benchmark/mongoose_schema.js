var mongoose = require("mongoose");
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema
var Schema = mongoose.Schema;

var Tweet = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  parent: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  created_at: Date
});

var Relationship = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  created_at: Date
});

var User = new Schema({
  name: String,
  email: String,
  password: String,
  handle: String,
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ],
  followees: {
    type: [Relationship],
    default: []
  },
  followers: {
    type: [Relationship],
    default: []
  }
});

var Hashtag = new Schema({
  content: String,
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ]
});

var Mention = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ]
});

module.exports = mongoose.model('User', User);
module.exports = mongoose.model('Tweet', Tweet);
module.exports = mongoose.model('Hashtag', Hashtag);
module.exports = mongoose.model('Mention', Mention);
