const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  brand: String,
  image: String,
  price: String,
  inStock: Number,
  pickedQty: Number,
  color: String,
  gender: String,
  productId: String,
});

module.exports = mongoose.model("Cart", cartSchema);
