const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const walletRoutes = require("./wallet-routes");
const sellRoutes = reqiure("./sell-routes");

router.use("/user", userRoutes);
router.use("/wallet", walletRoutes);
router.use("/sell", sellRoutes);

module.exports = router;
