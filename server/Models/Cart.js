const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  pickedQty: Number,
});

module.exports = mongoose.model("Cart", cartSchema);
