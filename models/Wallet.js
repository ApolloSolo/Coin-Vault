const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Wallet extends Model {}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    btc: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
    },
    eth: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
    },
    atom: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
    },
    doge: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "wallet",
  }
);

module.exports = Wallet;