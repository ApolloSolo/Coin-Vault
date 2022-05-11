async function defaultAmount() {
  let coin = document.getElementById("coinSelect");
  let price = document.getElementById("price");
  let quantity = document.getElementById("quantity");
  let currentQuantity = coin.options[coin.selectedIndex].dataset.userquantity;
  let currentPrice = coin.options[coin.selectedIndex].value;
  console.log(currentPrice);
  quantity.value = currentQuantity;
  price.value = currentPrice;
}

function updateTotal(price) {
  let totalEl = document.getElementById("total");
  const buyBtn = document.getElementById("buy-btn");
  let quantityEl = parseFloat(document.getElementById("quantity").value);
  let priceEl = parseFloat(document.getElementById("price").value);
  let totalSellValue = priceEl * quantityEl;
  totalSellValue = totalSellValue.toFixed(2);
  totalEl.value = totalSellValue;
  buyBtn.classList.remove("disabled");
}

async function sellCoins(event) {
  event.preventDefault();
  
  //Get total value of coins
  let total = document.getElementById("total").value;
  total = parseFloat(total);

  //Get user's current funds to calc money after sell
  let userFunds = document.getElementById("userFunds").innerText;
  userFunds = parseFloat(userFunds);

  //Get the select element to then get selected option attributes
  let coin = document.getElementById("coinSelect");

  //The current number of coins the user has before sell
  let currentQuantity = coin.options[coin.selectedIndex].dataset.userquantity;

  //Get number of coins user intends to sell
  let sellQuantity = document.getElementById("quantity").value;

  //Get coin name to than use in if statments to create put request
  let coinTicker = coin.options[coin.selectedIndex].innerText;

  //Get user's id to update correct user in DB
  const userID = document.getElementById("userFunds").dataset.id;

  //Remaining coins after user has sold
  let coinsRemaining = currentQuantity - sellQuantity;

  //Calc user's money based on sell and current funds
  let sumOfSell = userFunds + total;
  

 let putCoin = {};

 if (coinTicker === "Doge") {
   putCoin = {
     method: "PUT",
     body: JSON.stringify({
       doge: coinsRemaining,
     }),
     headers: {
       "Content-Type": "application/json",
     },
   };
 } else if (coinTicker === "Bitcoin") {
   putCoin = {
     method: "PUT",
     body: JSON.stringify({
       btc: coinsRemaining,
     }),
     headers: {
       "Content-Type": "application/json",
     },
   };
 } else if (coinTicker === "Ethereum") {
   putCoin = {
     method: "PUT",
     body: JSON.stringify({
       eth: coinsRemaining,
     }),
     headers: {
       "Content-Type": "application/json",
     },
   };
 } else if (coinTicker === "Atom") {
   putCoin = {
     method: "PUT",
     body: JSON.stringify({
       atom: coinsRemaining,
     }),
     headers: {
       "Content-Type": "application/json",
     },
   };
 }

 const response = await fetch(`/api/wallet/${userID}`, putCoin);

  const userUpdate = await fetch(`/api/user/${userID}`, {
    method: "PUT",
    body: JSON.stringify({
      money: sumOfSell,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
 if (response.ok && userUpdate.ok) {
   document.location.replace("/dashboard");
 } else {
   console.log(response.statusText);
 }
}

document.querySelector("#coinSelect").addEventListener("change", defaultAmount);
document.querySelector("#quantity").addEventListener("change", updateTotal);
document.querySelector("#buyForm").addEventListener("submit", sellCoins);