const router = require("express").Router();
const { User } = require("../models/");
const hasSess = require('../utils/auth');

// homepage
router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get('/dashboard', async (req, res) => {

})

module.exports = router;
