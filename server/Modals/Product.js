const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: String,
  price: String,
  pickedQty: Number,
  onSale: {
    sale: Boolean,
    discountPrice: Number,
  },
  image: String,
  description: String,
  colors: [
    {
      color: String,
      choosen: Boolean,
    },
  ],
  features: {
    gender: String,
    inStock: Number,
    cashOnDelivery: String,
    warranty: String,
    size: Number,
    brand: String,
    return: String,
    uv: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
