//async function --> coin amounts are changed when the user hits coinSelect
//select price amount--> this will give us the current price of the coin. 
//select quantity amount--> this will give us the amount that the user wants to purchase
//finding the value of the price and quantity will give us the current user's price/quantity
async function startingAmount() {
    let coin = document.getElementById('coinSelect');
    let price = document.getElementById('price');
    let quantity = document.getElementById('quantity');
    let currentQuantity = coin.options[coin.selectedIndex].dataset.userquantity;
    let currentPrice = coin.options[coin.selectedIndex].value;
    console.log(currentPrice);
    console.log(currentQuantity);
    quantity.value = currentQuantity;
    price.value = currentPrice;
}

//quantity changes when the user selects how many coins they want to purchase
//updating the total amount--> multiply the price by the quantity in order to find the correct amount that the user wishes to purchase
function getTotal(price) {
    let totalEl = document.getElementById('total');
    const buyBtn = document.getElementById('buy-btn');
    //parseFloat function--> parses an argument(converting to a string first if needed) and returns a floating point number
    let quantityEl = parseFloat(document.getElementById('quantity').value);
    let priceEl = parseFloat(document.getElementById('price').value);
    let totalBuyAmt = priceEl * quantityEl;
    //toFixed(2)-->formats a number to two decimal places
    totalBuyAmt = totalBuyAmt.toFixed(2);
    totalEl.value = totalBuyAmt;
    //remove 'disabled' class from 'total'
    buyBtn.classList.remove('disabled');
}

function buyCoin(event) {
    event.preventDefault();

    //total amount of coins
    let totalCoin = document.getElementById('total').value;
    total = parseFloat(total);
    //user's money
    let userMoney = document.getElementById('userFunds').innerText;
    userMoney = parseFloat(userMoney);
    //selected coin
    let coin = document.getElementById('coinSelect');
    //amount of coins the user has before purchase
    let currentAmount = coin.options[coin.selectedIndex].dataset.userQuantity;
    //amount of coins the user intends to purchase
    let amountToBuy = document.getElementById('quantity').value;
    //coin name
    let decidedCoin = coin.options[coin.selectedIndex].innerText;
    //user's id for correct identification in database
    const userId = document.getElementById('userFunds').dataset.id;
    //new amount of coins after purchase
    let walletAmount = currentAmount + amountToBuy;
    //user's money after purchase
    let newUserAmount = userMoney + totalCoin;
    
    let coinAmount = {};
    //if coinTicker === chosen coin, PUT request for that coin to be updated in the wallet
    if (decidedCoin === 'Bitcoin') {
        coinAmount = {
            method: 'PUT',
            body: JSON.stringify({
                btc: walletAmount
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } else if (decidedCoin === 'Ethereum') {
        coinAmount = {
            method: 'PUT',
            body: JSON.stringify({
                eth: walletAmount
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } else if (decidedCoin === 'Doge') {
        coinAmount = {
            method: 'PUT',
            body: JSON.stringify({
                doge: walletAmount
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } else if (decidedCoin === 'Atom') {
        coinAmount = {
            method: 'PUT',
            body: JSON.stringify({
                atom: walletAmount,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        console.log('buyCoin');
    }

    //fetch the user's wallet id and coinAmount obj
    const response = await fetch(`/api/wallet/${userId}`, coinAmount);

    //update the user's money with the new amount
    const updateUser = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            money: newUserAmount,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    //if the response and the updated user is all okay, direct to the /dashboard
    if (response.ok && updateUser.ok) {
        document.location.replace('/dashboard');
    } else {
        return response.statusText;
    }
}

//document.querySelector/aEL for when the user hits coinSelect
document.querySelector('#coinSelect').addEventListener('change', startingAmount);
//document.querySelector/aEL for when the user changes the quantity
document.querySelector('#quantity').addEventListener('change', getTotal);
//document.querySelector/aEL for the buyForm id that executes the buyCoin function
document.querySelector('#buyForm').addEventListener('submit', buyCoin);