var Hashtag = require('../models/hashtag');
var Mention = require('../models/mention');
var Relationship = require('../models/relationship');
var User = require('../models/user');
var Tweet = require('../models/tweet');

module.exports.search = function (req, res, next) {
  var term = req.body.term;
  if (term.startsWith("#")) {
    searchHashtag(term);
  } else if (term.startsWith("@")) {
    searchMention(term);
  } else {
    searchWord(term);
  };
};

function searchHashtag(term) {
  
};

function searchMention(term) {

};

function searchWord(term) {
  models.Tweet.findAll({
    where: {
      content: {
        $like: '%' + term + '%'
      }
    },
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['content', 'createdAt']
  }).then(function(tweets) {
    res.render("NOT YET IMPLEMENTED", JSON.stringify(tweets));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};
