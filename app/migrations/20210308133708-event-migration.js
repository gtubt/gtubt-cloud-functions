"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      coverImageUrl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },
      date: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
