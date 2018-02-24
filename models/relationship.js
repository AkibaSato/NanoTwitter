const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

var Relationship = new Schema({
  follower: {type: Schema.Types.ObjectId, ref: 'User'},
  followee: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: Date
});

module.exports = mongoose.model('Relationship', Relationship);
