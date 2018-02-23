const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tweet = require('./tweet');

var Relationship = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  created_at: Date
});

module.exports = mongoose.model('Relationship', Relationship);
