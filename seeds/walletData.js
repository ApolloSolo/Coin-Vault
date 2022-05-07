const { Wallet } = require('../models');

const walletdata = [
  {
    userid: '1',
    btc: '2',
    eth: '25',
    atom: '50',
    doge:'120'
  },
  {
    userid: '2',
    btc: '2',
    eth: '25',
    atom: '50',
    doge:'120'
  },
  {
    userid: '3',
    btc: '2',
    eth: '25',
    atom: '50',
    doge:'120'
  },
  {
    userid: '4',
    btc: '2',
    eth: '425',
    atom: '50',
    doge:'120'
  },
];

const seedWallet = () => Wallet.bulkCreate(walletdata);

module.exports = seedWallet;