//async function --> coin amounts are changed when the user hits coinSelect

//quantity changes when the user selects how many coins they want to purchase

function buyCoin(event) {
    event.preventDefault();

    //total amount of coins
    let totalCoin = document.getElementById('total').value;
    //user's money
    let userMoney = document.getElementById('userFunds').innerText;
    //selected coin
    let coinSelect = document.getElementById('coinSelect');
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
//document.querySelector/aEL for when the user changes the quantity
//document.querySelector/aEL for the buyForm id that executes the buyCoin function
document.querySelector('#buyForm').addEventListener('submit', buyCoin);