const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  price: { type: String, required: true },
  onSale: {
    sale: Boolean,
    discountPrice: Number,
  },
  imgs: [String],
  description: { type: String, required: true },
  features: {
    gender: { type: String, required: true },
    inStock: { type: Number, required: true },
    cashOnDelivery: { type: Boolean, required: true },
    warranty: { type: String, required: true },
    size: { type: Number, required: true },
    return: { type: String, required: true },
    uv: String,
    frameColor: { type: String },
    lensColor: { type: String },
    reviews: [
      {
        star: Number,
        review: String,
      },
    ],
    questions: [{ question: String, answer: String }],
    buyers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
});

module.exports = mongoose.model("Product", productSchema);
