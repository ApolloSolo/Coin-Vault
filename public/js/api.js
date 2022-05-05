require('dotenv').config();

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': api-host,
    'X-RapidAPI-Key': api-key
  }
};

const coinArray = [];
//BIT uuid/symbol/price
//ETH uuid/symbol/price
//DOGE uuid/symbol/price
//ATOM uuid/symbol/price

async function getCoinData() {
  let data = await axios.get('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
  console.log(data);
  loopCoin(data);
}

function loopCoin(data, i) {
  for (var i = 0; i < data.data.data.coins.length; i++) {
      var uuid = data.data.data.coins[i].uuid;
      var symbol = data.data.data.coins[i].symbol;
      var price = data.data.data.coins[i].price;

      var coinObject = {
          uuid,
          symbol,
          price
      }
      coinArray.push(coinObject);
  }
  //console.log(coinArray);
  getSomeCoins(coinArray);
  }

function getSomeCoins(coinArray) {
  bitCoin = coinArray[0];
  ethCoin = coinArray[1];
  dogeCoin = coinArray[11];
  atomCoin = coinArray[27];

  fourCoinArray.push(bitCoin);
  fourCoinArray.push(ethCoin);
  fourCoinArray.push(dogeCoin);
  fourCoinArray.push(atomCoin);

  displayCoin(fourCoinArray);
}

function displayCoin() {
  console.log(fourCoinArray);
}

getCoinData();

//document.addEventListener => call allCoinData with which button?

//coins: BTC, ETC, DOGE, ATOM