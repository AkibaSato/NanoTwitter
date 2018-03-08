var models  = require('../models');

module.exports.tweet =  function (req, res) {
  models.Tweet.create({
      content: req.body.content,
      userId: req.user._id,
      parentId: req.body.parentId
  }).then(function(tweet) {
    res.render("NOT YET IMPLEMENTED", JSON.stringify(tweet));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports.getTweet = function (req, res) {
  models.Tweet.findOne({
    where: {id: parseInt(req.params.id)},
    include: [{
      model: models.User,
      as: 'user',
      attributes: ['username']
    }],
    attributes: ['content', 'createdAt']
  }).then(function(tweet) {
    res.render("NOT YET IMPLEMENTED", JSON.stringify(tweet));
  }).catch(function(err) {
    res.status(404).send(err);
  });
};
