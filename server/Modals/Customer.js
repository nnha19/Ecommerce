const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Customer", customerSchema);
