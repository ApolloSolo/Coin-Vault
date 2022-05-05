const router = require("express").Router();
const { User, Wallet } = require("../../models");
const startingFunds = 10000;

//Get all users
router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(users);
});

//Find one user by ID
router.get("/:id", async (req, res) => {
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
    res.status(404).json({ message: "No user found by that id" });
    return;
  }
  res.json(userData);
});

//Create a user
router.post("/", async (req, res) => {
  let newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    money: startingFunds,
  });
  //Wallet creation concurrent with user.
  let newWallet = await Wallet.create({
    user_id: newUser.id,
    btc: 0,
    eth: 0,
    atom: 0,
    doge: 0,
  });
  req.session.save(() => {
    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;
  });
  res.json([newUser, newWallet]);
});

// Login
router.post("/login", async (req, res) => {
  const userData = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!userData) {
    res.status(404).json({ message: "User email not found" });
    return;
  }
  const validPassword = userData.checkPassword(req.body.password);
  if (!validPassword) {
    res.status(400).json({ message: "Incorrect password!" });
    return;
  }

  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.loggedIn = true;

    res.json({ user: userData, message: "You are now logged in!" });
  });
});

// Logout
router.post("/logout", (req, res) => {
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

//Delete User By ID
router.delete("/:id", async (req, res) => {
  const userData = User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json({ userData });
});

module.exports = router;
