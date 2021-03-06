const router = require("express").Router();
const catchAsyncError = require("../utils/catchAsyncError");
const ExpressError = require("../utils/ExpressError");
const { User, Wallet } = require("../models/");
const hasSess = require("../utils/auth");
const reducedCoinData = require("../public/js/coinranking");
const {
  getUserTickers,
  calcUserValuation,
} = require("../public/js/coinHelpers");

// homepage
router.get("/", (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("homepage", { loggedIn: req.session.loggedIn });
});

// Dashboard
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
          attributes: ["btc", "eth", "doge", "atom"],
        },
      ],
    });
    if (!userData) {
      throw new ExpressError("Could no find user", 404);
    }

    // Get coin market values
    const coinData = await reducedCoinData();

    // Normalize returned db object
    userData = userData.get({ plain: true });

    // Get user funds before updating their funds to include coin values
    const currentFunds = userData.money;

    // Get tickers for coins the user owns
    let tickers = getUserTickers(userData.wallet);

    // Update user valuation with coin values + funds available
    userData = calcUserValuation(coinData, tickers, userData);

    console.log(coinData);

    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      userData,
      currentFunds,
      coinData,
    });
  })
);

router.get(
  "/buy",
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
        }
      ]
    });
    const coinData = await reducedCoinData();
    console.log(coinData);

    let coinPrice = {
      btc: coinData[0].price,
      eth: coinData[1].price,
      doge: coinData[2].price,
      atom: coinData[3].price
    }
    userData = await userData.get({ plain: true });
    res.render("buy", { userData, loggedIn: req.session.loggedIn, coinPrice});
  })
);

router.get(
  "/sell",
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

    const coinData = await reducedCoinData();
    console.log(coinData);

    let coinPrice = {
      btc: coinData[0].price,
      eth: coinData[1].price,
      doge: coinData[2].price,
      atom: coinData[3].price,
    };

    userData = await userData.get({ plain: true });
    res.render("sell", { userData, loggedIn: req.session.loggedIn, coinPrice });
  })
);

router.get(
  "/buy",
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

    const coinData = await reducedCoinData();

    let coinPrice = {
      btc: coinData[0].price,
      eth: coinData[1].price,
      doge: coinData[2].price,
      atom: coinData[3].price,
    };

    userData = await userData.get({ plain: true });

    res.render("buy", { userData, loggedIn: req.session.loggedIn, coinPrice });
  })
);

module.exports = router;
