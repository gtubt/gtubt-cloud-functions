"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static OwnerAssociation = null;
    static EventAssociation = null;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.OwnerAssociation = Ticket.belongsTo(models.User, { as: "owner", foreignKey: { allowNull: false } });
      this.EventAssociation = Ticket.belongsTo(models.Event, { as: "event", foreignKey: { allowNull: false } });
    }
  }

  Ticket.init(
    {},
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
