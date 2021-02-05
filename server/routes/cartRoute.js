const router = require("express").Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAllItemsFromCart);
router.post("/", cartController.createCartItem);

router.put("/update-cart-item/:cartItemId", cartController.updateCartItem);

module.exports = router;
