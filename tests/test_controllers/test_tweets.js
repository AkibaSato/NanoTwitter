var models  = require('../../models');


module.exports.bulkTweet=async function(res, tweets) {
  return models.Tweet.bulkCreate(tweets, {individualHooks: true}).then(function(tweet) {
    return JSON.parse(JSON.stringify(tweet))
  }).catch(function(err) {
    console.log(err);
  });
}



module.exports.generate = async function (res, tweetData) {
  return models.Tweet.create(tweetData).then(function(tweet) {

      return JSON.parse(JSON.stringify(tweet))
  }).catch(function(err) {
    console.log(err);
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
  // models.Tweet.destroy({where: {}, truncate : true, cascade: true }).then(function () {});
  models.Tweet.truncate({ cascade: true });

}
