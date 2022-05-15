const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

router.use("*", (req, res) => {
  res.status(404).end();
});

//ExpressError passes data to our error handler
// router.use((err, req, res, next) => {
//   const { status = 500, message = 'Something went wrong' } = err;
//   res.status(status).send(message)
// });

module.exports = router;
