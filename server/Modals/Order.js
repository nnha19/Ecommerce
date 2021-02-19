const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order: {
    personInfos: {
      name: {
        type: String,
        required: true,
      },
      phNumber: {
        type: Number,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      houseNumber: {
        type: String,
        required: true,
      },
      message: { type: String },
    },
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
});

module.exports = mongoose.model("Order", orderSchema);
