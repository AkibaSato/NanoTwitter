const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

var Mention = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ]
});

mongoose.model('Mention', Mention);
