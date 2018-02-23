const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tweet = require('./tweet');

var Hashtag = new Schema({
  content: String,
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ]
});

module.exports = mongoose.model('Hashtag', Hashtag);
