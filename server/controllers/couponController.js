const { reset } = require("nodemon");
const Coupon = require("../Modals/Coupon");
const Customer = require("../Modals/Customer");

const getAllCoupons = async (req, res, next) => {
  try {
    if (!req.admin) {
      res.status(400).json("You are not authorized to see the content.");
    } else {
      const allCoupons = await Coupon.find({});
      res.status(200).json(allCoupons);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const getCouponById = async (req, res, next) => {
  try {
    if (req.admin) {
      res.status(400).json("You are not authorized to get this coupon");
    } else {
      const coupon = await Coupon.findById(req.params.couponId);
      res.status(200).json(coupon);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const getCouponByUserId = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { code } = req.body;
    const customer = await Customer.findById(uid);
    const customerCoupon = await Coupon.findOne({ code });
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
    } else {
      res.status(400).json("You are not authorized to take this action.");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const updateCoupon = async (req, res, next) => {
  try {
    if (req.admin) {
      res.status(400).json("Only admin can edit coupon");
    } else {
      const { code, discountPrice } = req.body;
      const { couponId } = req.params;
      const updateVal = { code, discountPrice };
      const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateVal);
      res.status(200).json(updatedCoupon);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
    if (!req.admin) {
      res.status(400).json("You are not authorized to delete this coupon");
    } else {
      const { couponId } = req.params;
      await Coupon.findByIdAndRemove(couponId);
      const allCustomers = await Customer.find({});
      allCustomers.forEach(async (customer) => {
        const leftCoupons = customer.usedCoupon.filter(
          (id) => id.toString() !== couponId
        );
        customer.usedCoupon = leftCoupons;
        await customer.save();
      });
      res.status(200).json("Successfully delete the coupon.");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getAllCoupons = getAllCoupons;
exports.getCouponById = getCouponById;
exports.getCouponByUserId = getCouponByUserId;
exports.createCoupon = createCoupon;
exports.updateCoupon = updateCoupon;
exports.deleteCoupon = deleteCoupon;
