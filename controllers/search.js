var models = require('../models')

// Example return JSON:
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
module.exports.search = (req, res, next) => {
  var term = req.params.term;
  var searchPromise;
  if (term.startsWith('#')) {
    searchPromise = searchHashtag(term.substring(1));
  } else if (term.startsWith('@')) {
    searchPromise = searchMention(term.substring(1));
  } else {
    searchPromise = searchWord(term);
  };

  searchPromise
  .then(tweets => {
    res.render("NOT YET IMPLEMENTED", JSON.parse(JSON.stringify(tweets)));
  }).catch(err => {
    res.status(404).send(err);
  });
};

// Return promise to search for term through Hashtag table.
// TODO: Crazy four-table join.
function searchHashtag(term) {
  return models.HashtagTweet.findAll({
    include: [
      {
        model: models.Hashtag,
        as: 'hashtag',
        attributes: ['content'],
        where: { 'content': term }
      },
      {
        model: models.Tweet,
        as: 'tweet',
        attributes: ['content', 'createdAt'],
        include: [{
          model: models.User,
          as: 'user',
          attributes: ['username']
        }]
      }
    ],
    attributes: ['createdAt']
  }).then(tweets => {
    return tweets.map(x => flattenHashtagJson(x));
  });
};

// JSONify a single row in the joined table from searchHashtag().
function flattenHashtagJson(x) {
  return {
    createdAt: x.tweet.createdAt,
    content: x.tweet.content,
    user: x.user
  };
}

// Return promise to search for term through Mention table.
function searchMention(term) {
  return models.Mention.findAll({
    include: [
      {
        model: models.User,
        as: 'user',
        where: { 'username': term },
        attributes: ['createdAt']
      },
      {
        model: models.Tweet,
        as: 'tweet',
        attributes: ['content', 'createdAt'],
        include: [{
          model: models.User,
          as: 'user',
          attributes: ['username']
        }]
      }
    ],
    attributes: ['createdAt']
  }).then(tweets => {
    return tweets.map(x => flattenMentionJson(x));
  });
};

// JSONify a single row in the joined table from searchMention().
function flattenMentionJson(x) {
  return {
    createdAt: x.tweet.createdAt,
    content: x.tweet.content,
    user: x.tweet.user
  };
}

// Return promise to search for term through Tweet table.
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
