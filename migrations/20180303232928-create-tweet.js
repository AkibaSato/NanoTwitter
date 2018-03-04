'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tweets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Tweets',
          key: 'id',
          as: 'parentId',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tweets');
  }
};
