var Hashtag = require('../models/hashtag');
var Mention = require('../models/mention');
var Relationship = require('../models/relationship');
var User = require('../models/user');
var Tweet = require('../models/tweet');

module.exports.search = function (req, res, next) {
  // // TODO: Find in Hashtag/Mention coll. for hashtags and mentions.
  // //       For regular words, do regex matching in Tweet coll.
  // var term = req.body.term;
  // Tweet.find({ content: {$regex: new RegExp(term), $options: 'i' }})
  // .sort({'created_at': -1})
  // .limit(1000)
  // .exec(function(err, tweets) {
  //   if (err) {
  //     res.status(404).send(err);
  //     return;
  //   }
  //   res.send("NOT YET IMPLEMENTED");
  // });
  res.send("NOT YET IMPLEMENTED");
};
