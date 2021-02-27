"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Za-z\s]+$/i,
          notEmpty: true,
        },
      },
      lastname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Za-z\s]+$/i,
          notEmpty: true,
        },
      },
      department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
          isIn: [["cse", "eee"]],
        },
      },
      year: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 1,
        },
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      studentId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [8, 12],
        },
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is_valid_phone_number(value) {
            if (!value) return value;

            var regexp = /^[0-9]+$/;
            var values = Array.isArray(value) ? value : [value];

            values.forEach(function (val) {
              if (!regexp.test(val)) {
                throw new Error("Only numbers in the phone number is allowed.");
              }
            });
            return value;
          },
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
    await queryInterface.dropTable("Users");
  },
};
