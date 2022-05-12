function buyCoin(event) {
    event.preventDefault();

    //let walletAmount = currentAmount + amountToBuy
    //coinTicker --> innerText of what the user selected to purchase
    let coinAmount = {};
    //if coinTicker === chosen coin, PUT request for that coin to be updated in the wallet
    if (coinTicker === 'Bitcoin') {
        coinAmount = {
            method: 'PUT',
            body: JSON.stringify({
                btc: walletAmount
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } else if (coinTicker === 'Ethereum') {
        coinAmount = {
            method: 'PUT',
            body: JSON.stringify({
                eth: walletAmount
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } else if (coinTicker === 'Doge') {
        coinAmount = {
            method: 'PUT',
            body: JSON.stringify({
                doge: walletAmount
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } else if (coinTicker === 'Atom') {
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
}