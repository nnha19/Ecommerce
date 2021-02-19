const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.post("/", orderController.placeOrder);

module.exports = router;
