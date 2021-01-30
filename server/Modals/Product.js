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
});

module.exports = mongoose.model("Product", productSchema);
