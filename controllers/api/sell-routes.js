const router = require("express").Router();
const { Wallet } = require("../../models/index");

//PUT request to update Wallet with sell functionality
router.put("/:id", (req, res) => {
    Wallet.update(req.body, {
        where: {
            id: req.params.id
        },
    })
    .then((updatedWallet) => {
        if (!updatedWallet) {
            res.json({ message: "Wallet could not be found." });
            return;
        }
        res.json(updatedWallet);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

module.exports = router;


//put request to update coin amount dependent on user input. if user input > coin amount, throw error 
async function sellCoins(event) {
    event.preventDefault();

    //const btc
    //const eth
    //const atom
    //const doge

    //if statements--> 
    //if coin to be sold is btc, run math function on btc price/coin amount
    //if coin == eth, run math function on eth
    //

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

//multiply price of coin by amount in user wallet


document.querySelector(".modal-btn").addEventListener("click", sellCoins);