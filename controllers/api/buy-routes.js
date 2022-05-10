const router = require("express").Router();
const { Wallet } = require("../../models/index");

//PUT request to update Wallet with buy functionality
router.put("/:id", (req, res) => {
    Wallet.update(req.body, {
        where: {
            id: req.params.id
        },
    })
    .then((updatedWallet) => {
        if (!updatedWallet) {
            res.json({ message: "Wallet could not be found." });
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