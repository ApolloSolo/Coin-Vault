function calcBuyCost() {
  const buyBtn = document.getElementById("buy-btn");
  let currentFunds = parseFloat(
    document.getElementById("userFunds").innerText.trim()
  );
  let marketValueEl = document.getElementById("market-value");
  let total = document.getElementById("total");
  let quantity = document.getElementById("quantity").value;
  let coinSelector = document.getElementById("coinSelect");
  let coinPrice = coinSelector.options[coinSelector.selectedIndex].value;

  marketValueEl.value = coinPrice;

  let totalCost = parseFloat(quantity * coinPrice);
  total.value = totalCost;

  if (totalCost < currentFunds) {
    buyBtn.classList.remove("disabled");
  } else if (totalCost > currentFunds) {
    buyBtn.classList.add("disabled");
  }
}

async function buy(event) {
  event.preventDefault();
  const userID = document.getElementById("userFunds").dataset.id;
  const userFunds = parseFloat(
    document.getElementById("userFunds").innerText.trim()
  );
  let coinSelector = document.getElementById("coinSelect");
  let coinTicker =
    coinSelector.options[coinSelector.selectedIndex].dataset.symbol;
  let currentCoinsOwned = parseFloat(
    coinSelector.options[coinSelector.selectedIndex].dataset.userquantity
  );
  let marketValue = parseFloat(
    document.getElementById("market-value").value.trim()
  );
  let buyQuantity = parseFloat(
    document.getElementById("quantity").value.trim()
  );

  let buyCost = marketValue * buyQuantity;
  let newCoinTotal = currentCoinsOwned + buyQuantity;
  let updatedFunds = userFunds - buyCost;

  let putCoin = {};

  if (coinTicker === "doge") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        doge: newCoinTotal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "btc") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        btc: newCoinTotal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "eth") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        eth: newCoinTotal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "atom") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        atom: newCoinTotal,
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
      money: updatedFunds,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("User ID: " + userID);
  console.log("Coin Ticker: " + coinTicker);
  console.log("Market Value: " + marketValue);
  console.log("Buy Quantity: " + buyQuantity);
  console.log("Total Cost: " + buyCost);
  console.log("Updated Funds: " + updatedFunds);
  console.log(
    "Current number of " + coinTicker + " owned: " + currentCoinsOwned
  );
  console.log(typeof newCoinTotal);

  if (response.ok && userUpdate.ok) {
    document.location.replace("/dashboard");
  } else {
    console.log(response.statusText);
    console.log(userUpdate.statusText);
  }
}

document.getElementById("quantity").addEventListener("change", calcBuyCost);
document.getElementById("buyForm").addEventListener("submit", buy);
