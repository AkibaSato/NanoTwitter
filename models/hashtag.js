const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tweet = mongoose.model('Tweet');

var Hashtag = new Schema({
  content: String,
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ]
});

mongoose.model('Hashtag', Hashtag);
