const router = require("express").Router({ mergeParams: true });
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrdersByUserId);
router.post("/", orderController.placeOrder);

module.exports = router;
