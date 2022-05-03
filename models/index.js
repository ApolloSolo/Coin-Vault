const User = require("./User");
const Wallet = require("./Wallet");

User.hasOne(Wallet, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Wallet.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Wallet,
};