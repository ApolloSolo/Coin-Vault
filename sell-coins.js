//put request to update coin amount dependent on user input. if user input > coin amount, throw error 

async function sellCoins(event) {
    event.preventDefault();

    //const btc
    //const eth
    //const atom
    //const doge
    
    const response = await fetch("/api/wallet/:id", {
        method: "put",
        body: JSON.stringify({
            btc,
            eth,
            atom,
            doge
        }),
        headers: { "Content-Type": "application/json" },
    })
    if (err) {
        throw err;
    } else {
        console.log(response);
    }
};

document.querySelector(".modal-btn").addEventListener("click", sellCoins);