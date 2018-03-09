var models = require('../models')

// [{
//  "content": "hey",
//  "createdAt": "2018-03-09T04:30:08.385Z",
//  "user": {
//   "username": "bob_builder"
//  }
// },
// {
//  "content": "hey bob_builder",
//  "createdAt": "2018-03-09T04:30:08.385Z",
//  "user": {
//   "username":"dora_explorer"
//  }
// }]
module.exports.search = function (req, res, next) {
  var term = req.params.term;
  console.log("entered")
  console.log(term)
  var searchPromise;
  if (term.startsWith('#')) {
    searchPromise = searchHashtag(term);
  } else if (term.startsWith('@')) {
    searchPromise = searchMention(term);
  } else {
    searchPromise = searchWord(term);
  };

  searchPromise
  .then(function(tweets) {
    console.log(JSON.stringify(tweets));
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweets)));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

function searchHashtag(term) {
  console.log(term)
  return models.Hashtag.findAll({
    where: {
      content: term
    },
    include: [{
      model: models.Tweet,
      as: 'tweet',
      attributes: ['content', 'createdAt'],
      include: [{
        model: models.User,
        as: 'user',
        attributes: ['username']
      }]
    }],
    attributes: ['createdAt']
  });
};

function searchMention(term) {

};

function searchWord(term) {
  return models.Tweet.findAll({
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
  });
};
