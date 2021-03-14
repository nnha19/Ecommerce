const Coupon = require("../Modals/Coupon");

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

exports.createCoupon = createCoupon;
