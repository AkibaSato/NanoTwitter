const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Relationship = require('./relationship');
const Tweet = require('./tweet');

var User = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  username: String,
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ],
  followees: {
    type: [Relationship.schema],
    default: []
  },
  followers: {
    type: [Relationship.schema],
    default: []
  }
});

// Check if the password is the same. TODO: Use encryption.
User.methods.validPassword = function(password) {
    return password == this.password;
};

module.exports = mongoose.model('User', User);
