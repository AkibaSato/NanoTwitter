const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Relationship = mongoose.model('Relationship');
const Tweet = mongoose.model('Tweet');

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

mongoose.model('User', User);
