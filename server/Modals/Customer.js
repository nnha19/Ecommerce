const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  admin: Boolean,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  whilist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  usedCoupon: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
  ],
});

module.exports = mongoose.model("Customer", customerSchema);
