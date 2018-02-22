const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tweet = mongoose.model('Tweet');

var Relationship = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  created_at: Date
});

mongoose.model('Relationship', Relationship);
