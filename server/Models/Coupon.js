const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  discountPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("Coupon", couponSchema);
