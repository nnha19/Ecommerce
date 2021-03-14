const Coupon = require("../Modals/Coupon");
const Customer = require("../Modals/Customer");

const getCouponByUserId = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { code } = req.body;
    const customer = await Customer.findById(uid);
    const customerCoupon = await Coupon.findOne({ code });
    console.log(customerCoupon);
    if (!customerCoupon) {
      res.status(400).json("Invalid coupon code.");
    } else {
      const usedCoupon = customer.usedCoupon.some(
        (coupon) => coupon.toString() === customerCoupon._id
      );
      if (usedCoupon) {
        res.status(400).json("You have already used this one time coupon");
      } else {
        res.status(200).json(customerCoupon);
      }
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const createCoupon = async (req, res, next) => {
  try {
    const { code, discountPrice } = req.body;
    if (!req.admin) {
      const newCoupon = await Coupon.create({
        code,
        discountPrice,
      });
      res.status(200).json(newCoupon);
      //   res.status(200).json("coupon sucessfully created.");
    } else {
      res.status(400).json("You are not authorized to take this action.");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getCouponByUserId = getCouponByUserId;
exports.createCoupon = createCoupon;
