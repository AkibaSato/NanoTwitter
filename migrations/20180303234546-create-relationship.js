'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Relationships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
          as: 'followerId',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false
      },
      followeeId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
          as: 'followeeId',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false
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
    return queryInterface.dropTable('Relationships');
  }
};
