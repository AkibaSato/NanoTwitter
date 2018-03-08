const Relationship = require('../models').Relationship;

module.exports.getAll=function(req, res, next) {
  follows=[];
  Relationship.findAll({
    attributes: ['id']
  }).then(function (follows) {
    follows=follows
  }).catch(function(err) {
      console.log(err)
  });
  return follows;
};

module.exports.getAllCount=function(req, res, next) {
  return this.getAll().length
}


module.exports.getAllCount=function(req, res, next) {
  Relationship.destroy({where: {}}).then(function () {});
}


module.exports.destory=function(req, res, next) {
  Relationship.destroy({where: {
    followerId: req.id
    // followingId: req.id
    // followeeId: req.id
  }}).then(function () {});

}
