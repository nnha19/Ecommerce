const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  brand: String,
  image: String,
  price: String,
  pickedQty: Number,
  features: {
    gender: String,
    inStock: String,
  },
  color: String,
  productId: String,
});

module.exports = mongoose.model("Cart", cartSchema);
