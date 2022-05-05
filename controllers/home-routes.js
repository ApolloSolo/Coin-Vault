const router = require("express").Router();
const catchAsyncError = require("../utils/catchAsyncError");
const ExpressError = require("../utils/ExpressError");
const { User, Wallet } = require("../models/");
const hasSess = require("../utils/auth");
const reducedCoinData = require('../public/js/coinranking');

// homepage
router.get("/", (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("homepage", { loggedIn: req.session.loggedIn });
});

router.get(
  "/dashboard",
  hasSess,
  catchAsyncError(async (req, res) => {
    let userData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      },
      include: [
        {
          model: Wallet,
          attributes: ["btc", "eth", "atom", "doge"],
        },
      ],
    });

    if (!userData) {
      throw new ExpressError("Could no find user", 404);
    }

    // Get money before updating money to include coin values
    const currentFunds = await userData.money
    
    const coinData = await reducedCoinData();
    
    function getUserTickers(obj) {
      const userCoinKeys = Object.entries(obj);
      const userCoins = [];
      for(let i = 0; i < userCoinKeys.length; i ++) {
        if(parseFloat(userCoinKeys[i][1]) > 0) {
          userCoins.push(userCoinKeys[i][0])
        }
      }
      return userCoins;
    }

    userData = await userData.get({ plain: true }); 

    let tickers = getUserTickers(userData.wallet)

    for(let i = 0; i < coinData.length; i++) {
      for(let j = 0; j < tickers.length; j++) {
        if(tickers[j].toUpperCase() == coinData[i].symbol) {
          let coinPrice = coinData[i].price;
            console.log(coinPrice, coinData[i].symbol.toLowerCase());
          let value = userData.wallet[coinData[i].symbol.toLowerCase()];
          console.log(value)
        }
      }
    }
  

    console.log(coinData, userData, tickers);
    res.render("dashboard", { loggedIn: req.session.loggedIn, userData, currentFunds, coinData });
  })
);

module.exports = router;
