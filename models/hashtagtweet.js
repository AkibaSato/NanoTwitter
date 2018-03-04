'use strict';
module.exports = (sequelize, DataTypes) => {
  var HashtagTweet = sequelize.define('HashtagTweet', {}, {});

  HashtagTweet.associate = function (models) {
    models.HashtagTweet.belongsTo(models.Tweet, {
      foreignKey: 'tweetId',
      as: 'tweet',
      onDelete: 'cascade'
    });
    models.HashtagTweet.belongsTo(models.Hashtag, {
      foreignKey: 'hashtagId',
      as: 'hashtag',
      onDelete: 'cascade'
    });
  };

  return HashtagTweet;
};
