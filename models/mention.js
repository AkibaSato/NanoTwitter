const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Tweet = require('./tweet');

var Mention = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  tweets: [
    {type: Schema.Types.ObjectId, ref: 'Tweet'}
  ]
});

module.exports = mongoose.model('Mention', Mention);
