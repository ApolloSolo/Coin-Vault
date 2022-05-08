require('dotenv').config();

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': api-host,
    'X-RapidAPI-Key': api-key
  }
};

const coinArray = [];
const fourCoinArray = [];
//BTC symbol/price
const btcUuid = 'Qwsogvtv82FCd';
//ETH symbol/price
const ethUuid = 'razxDUgYGNAdQ';
//DOGE symbol/price
const dogeUuid = 'a91GCGd_u96cF';
//ATOM symbol/price
const atomUuid = 'Knsels4_Ol-Ny';

async function getCoinData() {
    let data = await axios.get('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
    //console.log(data);
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
  for (var i = 0; i < coinArray.length; i++) {
    if (btcUuid === coinArray[i].uuid) {
      bitCoin = coinArray[i];
      console.log(bitCoin);
    }
    if (ethUuid === coinArray[i].uuid) {
      ethCoin = coinArray[i];
      console.log(ethCoin);
    }
    if (dogeUuid === coinArray[i].uuid) {
      dogeCoin = coinArray[i];
      console.log(dogeCoin);
    }
    if (atomUuid === coinArray[i].uuid) {
      atomCoin = coinArray[i];
      console.log(atomCoin);
    }
  }

  fourCoinArray.push(bitCoin);
  fourCoinArray.push(ethCoin);
  fourCoinArray.push(dogeCoin);
  fourCoinArray.push(atomCoin);
}

getCoinData();

//document.addEventListener => call allCoinData with which button?

//coins: BTC, ETC, DOGE, ATOM