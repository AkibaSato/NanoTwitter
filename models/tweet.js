const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

var Tweet = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  parent: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  created_at: Date
});

module.exports = mongoose.model('Tweet', Tweet);
