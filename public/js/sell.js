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
  let total = document.getElementById("total").value;
  let userFunds = document.getElementById("userFunds").innerText;
  let coin = document.getElementById("coinSelect");
  let coinTicker = coin.options[coin.selectedIndex].value;
  const userID = document.getElementById("userFunds").dataset.id;
  userFunds = parseFloat(userFunds);
  let sumOfSell = userFunds + total;

  let putCoin = {};

  if (coinTicker === "Doge") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        doge: total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "Bitcoin") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        btc: total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "Ethereum") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        eth: total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "Atom") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        atom: total,
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
  if (userUpdate.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#coinSelect").addEventListener("change", defaultAmount);
document.querySelector("#quantity").addEventListener("change", updateTotal);
document.querySelector("#buyForm").addEventListener("submit", sellCoins);
