const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const walletRoutes = require("./wallet-routes");

router.use("/user", userRoutes);
router.use("/wallet", walletRoutes);

module.exports = router;
