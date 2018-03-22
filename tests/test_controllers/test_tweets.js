var models  = require('../../models');


module.exports.bulkTweet=function(req, res) {
  models.Tweet.bulkCreate(req.tweets).then(function(tweet) {

  }).catch(function(err) {
    console.log(err);
    res.status(404).send(err);
  });
}


module.exports.generate = async function (req, res, next) {
  return await models.Tweet.create({
      content: req.body.content,
      userId: req.user.id,
      parentId: req.body.parentId
      // content: "hello",
      // userId: 1,
      // parentId: null
  }).then(function(tweet) {
      return tweet
  }).catch(function(err) {
    console.log(err);
    res.status(404).send(err);
  });
};


module.exports.getAll= async function(req, res, next) {
  return models.Tweet.findAll({
    attributes: ['id']
  }).then(function (user) {
    return user
  }).catch(function(err) {
    console.log(err)
  });
};

module.exports.destroyAll=function(req, res, next) {
  models.Tweet.destroy({where: {}}).then(function () {});

}
