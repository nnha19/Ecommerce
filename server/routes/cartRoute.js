const router = require("express").Router();
const cartController = require("../controllers/cartController");

router.get("/:id", cartController.getAllItemsFromCart);
router.post("/:id", cartController.createCartItem);

router.put("/update-cart-item/:cartItemId", cartController.updateCartItem);
router.delete("/:cartItemId/:userId", cartController.deleteCartItem);

module.exports = router;
