const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order: {
    personInfos: {
      name: String,
      phNumber: String,
      region: String,
      city: String,
      houseNumber: String,
      userId: String,
    },
    item: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    orderDate: { type: String, required: true },
  },
});

module.exports = mongoose.model("Order", orderSchema);
