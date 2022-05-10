const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedWallet = require('./walletData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedWallet();

  process.exit(0);
};

seedAll();