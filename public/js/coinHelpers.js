function getUserTickers(obj) {
  const userCoinKeys = Object.entries(obj);
  const userCoins = [];
  for (let i = 0; i < userCoinKeys.length; i++) {
    if (parseFloat(userCoinKeys[i][1]) > 0) {
      userCoins.push(userCoinKeys[i][0]);
    }
  }
  return userCoins;
}

function calcUserValuation(coinArray, tickerArray, userObj) {
  for (let i = 0; i < coinArray.length; i++) {
    for (let j = 0; j < tickerArray.length; j++) {
      if (tickerArray[j].toUpperCase() == coinArray[i].symbol) {
        let coinPrice = coinArray[i].price;
        let coinsOwned = userObj.wallet[coinArray[i].symbol.toLowerCase()];
        userObj.money =
          parseFloat(coinsOwned * coinPrice + userObj.money);
        userObj.money = userObj.money.toFixed(2);
      }
    }
  }
  return userObj;
}

module.exports = {
  getUserTickers,
  calcUserValuation,
};
