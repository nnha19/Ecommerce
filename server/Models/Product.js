const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  onSale: {
    sale: Boolean,
    discountPrice: Number,
  },
  imgs: [String],
  description: { type: String, required: true },
  features: {
    gender: { type: String, required: true },
    inStock: { type: Number, required: true },
    cashOnDelivery: { type: String, required: true },
    warranty: { type: String, required: true },
    size: { type: String, required: true },
    return: { type: String, required: true },
    uv: String,
    frameColor: { type: String },
    lensColor: { type: String },
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  buyers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
