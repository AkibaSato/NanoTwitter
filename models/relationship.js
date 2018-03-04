'use strict';
module.exports = (sequelize, DataTypes) => {
  var Relationship = sequelize.define('Relationship', {}, {});

  Relationship.associate = function (models) {
    Relationship.belongsTo(models.User, {
      foreignKey: 'followerId',
      as: 'follower',
      onDelete: 'cascade'
    });
    Relationship.belongsTo(models.User, {
      foreignKey: 'followeeId',
      as: 'followee',
      onDelete: 'cascade'
    });
  };

  return Relationship;
};
