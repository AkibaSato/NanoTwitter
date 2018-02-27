const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Relationship = require('./relationship');
const Tweet = require('./tweet');
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");


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
  return bcrypt.compareSync(password, this.password);
};

User.plugin(uniqueValidator);

User.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});


module.exports = mongoose.model('User', User);
