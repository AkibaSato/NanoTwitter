var models = require('../models');

module.exports.getAll=async function(req, res, next) {
  return models.Relationship.findAll({
    attributes: ['id']
  }).then(function (user) {
    return user
  }).catch(function(err) {
    console.log(err)
  });
};



module.exports.destoryAll=function(req, res, next) {
  models.Relationship.destroy({where: {}}).then(function () {});
};


module.exports.destory=function(req, res, next) {
  models.Relationship.destroy({where: {
    followerId: req.id
    // followingId: req.id
    // followeeId: req.id
  }}).then(function () {});

}