const router = require("express").Router();
const couponController = require("../controllers/couponController");
const authMiddleware = require("../middlewares/authMiddleware");

// router.use(authMiddleware);
router.get("/:uid", couponController.getCouponByUserId);
router.post("/", couponController.createCoupon);

module.exports = router;
