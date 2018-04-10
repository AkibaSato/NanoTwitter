'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hashtag = sequelize.define('Hashtag', {
    content: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  Hashtag.associate = function (models) {
    models.Hashtag.hasMany(models.HashtagTweet, { onDelete: 'cascade', hooks: true });
  };

  return Hashtag;
};
