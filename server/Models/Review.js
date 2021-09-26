const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: { type: String },
  rating: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  timeStamp: { type: Date },
});

module.exports = mongoose.model("Review", reviewSchema);
