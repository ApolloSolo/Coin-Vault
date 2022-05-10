const router = require("express").Router();
const { Wallet } = require("../../models/index");
const catchAsyncError = require("../../utils/catchAsyncError");

router.get("/", (req, res) => {
  Wallet.findAll()
    .then((walletData) => {
      if (!walletData || !walletData.length) {
        res.json({ message: "No Wallets Found" });
        return;
      }
      res.json(walletData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/", (req, res) => {
  Wallet.create({
    ...req.body,
  })
    .then((newWallet) => {
      if (!newWallet) {
        res.json({ message: "New wallet could not be created" });
        return;
      }
      res.json(newWallet);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  Wallet.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedWallet) => {
      if (!updatedWallet) {
        res.json({ message: "Wallet could not be found or updated" });
        return;
      }
      res.json(updatedWallet);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});



module.exports = router;