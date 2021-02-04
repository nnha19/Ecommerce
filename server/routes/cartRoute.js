const router = require("express").Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAllItemsFromCart);
router.post("/", cartController.createCartItem);

module.exports = router;
