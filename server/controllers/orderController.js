const getAllOrders = (req, res, next) => {
  console.log("Getting all orders.");
};

const placeOrder = (req, res, next) => {
  console.log("Placing order");
};

exports.getAllOrders = getAllOrders;
exports.placeOrder = placeOrder;
