const coinArray = [];

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'a0f9c2e4cdmshbe352db2ac16675p113388jsne92dbdd69642'
  }
};

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
  }

getCoinData();

//document.addEventListener => call allCoinData with which button?