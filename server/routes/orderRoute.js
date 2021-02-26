const router = require("express").Router({ mergeParams: true });
const orderController = require("../controllers/orderController");
const authMiddleWare = require("../middlewares/authMiddleware");

router.get("/", orderController.getAllOrdersByUserId);

router.use(authMiddleWare);

router.post("/", orderController.placeOrder);
router.get("/admin", orderController.getAllOrders);

module.exports = router;
