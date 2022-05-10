const axios = require("axios");
require("dotenv").config();
const coinID = ["BTC", "ETH", "ATOM", "DOGE"];

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    "X-RapidAPI-Key": "e7d9710815msh122213a08c14487p1d2ed7jsnfcc325940b79",
  },
};

async function getCoinData() {
  let data = await axios.get(
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
    options
  );
  
  return data.data.data.coins;
}

async function reducedCoinData() {
  let coinData = await getCoinData();
  let newArray = [];
  for (let i = 0; i < coinData.length; i++) {
    for (let j = 0; j < coinID.length; j++) {
      if (coinData[i].symbol === coinID[j]) {
        let coin = {
          symbol: coinData[i].symbol,
          price: parseFloat(coinData[i].price).toFixed(2),
        };
        newArray.push(coin);
      }
    }
  }

  return newArray;
}

module.exports = reducedCoinData;
