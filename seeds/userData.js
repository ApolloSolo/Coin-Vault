const { User } = require('../models');

const userdata = [
  {
    username: 'Erin',
    email: 'ems1980@hotmail.com',
    password: 'crypto',
    money: '10000.00'
  },
  {
    username: 'Matt',
    email: 'matt@hotmail.com',
    password: 'crypto',
    money: '10000.00'
  },
  {
    username: 'Josh',
    email: 'josh@hotmail.com',
    password: 'crypto',
    money: '10000.00'
  },
  {
    username: 'Megan',
    email: 'megan@hotmail.com',
    password: 'crypto',
    money: '10000.00'
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
