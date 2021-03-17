const router = require("express").Router();
const couponController = require("../controllers/couponController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);
router.get("/", couponController.getAllCoupons);
router.get("/:couponId", couponController.getCouponById);
router.post("/:uid", couponController.getCouponByUserId);
router.post("/", couponController.createCoupon);
router.put("/:couponId", couponController.updateCoupon);
router.delete("/:couponId", couponController.deleteCoupon);

module.exports = router;
