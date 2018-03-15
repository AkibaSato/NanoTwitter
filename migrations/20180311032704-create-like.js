'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tweetId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'Tweets',
          key: 'id',
          as: 'tweetId',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }).then(function() {
      queryInterface.addIndex('Likes', ['tweetId']);
      queryInterface.addIndex('Likes', ['userId']);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};
