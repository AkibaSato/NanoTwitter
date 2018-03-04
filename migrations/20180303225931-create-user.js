'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fname: { type: Sequelize.STRING },
      lname: { type: Sequelize.STRING },
      email: {
        type: Sequelize.STRING,
        allowEmpty: false,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowEmpty: false,
        allowNull: false,
        validate: {
          len: {
            args: 3
          }
        }
      },
      username:  {
        type: Sequelize.STRING,
        allowEmpty: false,
        unique: true,
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
    return queryInterface.dropTable('Users');
  }
};
