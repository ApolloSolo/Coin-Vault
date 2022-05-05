const router = require("express").Router();
const { User } = require("../models/");
const hasSess = require('../utils/auth');

// homepage
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
