const router = require("express").Router();
const catchAsyncError = require("../utils/catchAsyncError");
//const { User } = require("../models/");
const hasSess = require('../utils/auth');

// homepage
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("homepage", { loggedIn: req.session.loggedIn });
});


router.get("/dashboard", hasSess, async (req, res) => {
  res.render("dashboard", { loggedIn: req.session.loggedIn });
});

module.exports = router;
