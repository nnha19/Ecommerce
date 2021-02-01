const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: String,
  price: String,
  onSale: {
    sale: Boolean,
    discountPrice: Number,
  },
  image: String,
  description: String,
  gender: String,
  inStock: Number,
  cashOnDelivery: Boolean,
  warranty: String,
});

module.exports = mongoose.model("Product", productSchema);
