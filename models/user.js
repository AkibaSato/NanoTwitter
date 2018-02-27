const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Relationship = require('./relationship');
const Tweet = require('./tweet');
const bcrypt = require('bcrypt');

var User = new Schema({
  fname: String,
  lname: String,
  username: String,
  email: String,
  password: String,
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

// Generate hash for password.
User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if the password is the same.
User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
