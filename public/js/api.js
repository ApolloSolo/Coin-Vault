const axios = require("axios");
require('dotenv').config();

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'e7d9710815msh122213a08c14487p1d2ed7jsnfcc325940b79'
  }
};

const coinArray = [];
//BIT symbol/price
//ETH symbol/price
//DOGE symbol/price
//ATOM symbol/price (number 25)

async function getCoinData() {
  let data = await axios.get('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
  console.log(data);
  loopCoin(data);
}

function loopCoin(data, i) {
  for (var i = 0; i < data.data.data.coins.length; i++) {
      var symbol = data.data.data.coins[i].symbol;
      var price = data.data.data.coins[i].price;

      var coinObject = {
          symbol,
          price
      }
      coinArray.push(coinObject);
  }
  console.log(coinArray);
  getSomeCoins(coinArray);
  }

function getSomeCoins(coinArray) {
  console.log(coinArray[0], coinArray[1], coinArray[11]);
}

module.exports = getCoinData;

//document.addEventListener => call allCoinData with which button?

//coins: BTC, ETC, DOGE, 