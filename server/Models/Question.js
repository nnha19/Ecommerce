const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  question: { q: String, timeStamp: { type: Date } },
  answer: { a: String, timeStamp: { type: Date } },
});

module.exports = mongoose.model("Question", questionSchema);
