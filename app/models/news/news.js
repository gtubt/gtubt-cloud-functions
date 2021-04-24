"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  News.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      coverImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [["announcement", "news"]],
        },
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
          isDate: true,
          is_earlier_than_today(startDate) {
            var date = new Date(startDate)
            let today = new Date()
            if (today > date) {
              throw new Error("Start date can't be earlier than today.");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
          isDate: true,
          is_earlier_than_start_day(endDate) {
            if (endDate < this.startDate) {
              throw new Error("End date can't be earlier than start date.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
