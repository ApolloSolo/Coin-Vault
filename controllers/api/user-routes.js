const router = require("express").Router();
const { User, Wallet } = require("../../models");
const startingFunds = 10000;
const ExpressError = require("../../utils/ExpressError");
const catchAsyncError = require("../../utils/catchAsyncError");

//Get all users
router.get(
  "/",
  catchAsyncError(async (req, res, next) => {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  })
);

//Find one user by ID
router.get(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    const userData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Wallet,
          attributes: ["btc", "eth", "atom", "doge"],
        },
      ],
    });
    if (!userData) {
      return next(new ExpressError("Could not find user", 404));
    }
    res.json(userData);
  })
);

//Create a user
router.post(
  "/",
  catchAsyncError(async (req, res, next) => {
    let userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      money: startingFunds,
    });
    //Wallet creation concurrent with user.
    let newWallet = await Wallet.create({
      user_id: userData.id,
      btc: 0,
      eth: 0,
      atom: 6,
      doge: 20,
    });

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json([userData, newWallet]);
      });
  })
);

// Login
router.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!userData) {
      throw new ExpressError("Could not find user", 404);
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      throw new ExpressError("Incorrect password!", 400);
    }

    //Upon login, req.session.user_id will point to MySQL Primary Key of id
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  })
);

// Logout
router.post("/logout", (req, res, next) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.json({ message: "logged out!" });
      res.status(204).end();
    });
  } else {
    res.json({ message: "NOT logged out! May not be logged in." });
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete User By ID
router.delete(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ userData });
  })
);

module.exports = router;
