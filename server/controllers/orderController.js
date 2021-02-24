const Customer = require("../Modals/Customer");
const Cart = require("../Modals/Cart");
const Order = require("../Modals/Order");

const getAllOrders = async (req, res, next) => {
  const { uid } = req.params;

  const user = await Customer.findById(uid);
  console.log(user);
  if (!user.admin) {
    res.status(400).json("You don't have access to that route");
  } else {
    Order.find({})
      .populate("order.item")
      .exec((err, order) => {
        if (err) {
          res.status(400).json(err);
        } else {
          console.log(order);
          res.status(200).json(order);
        }
      });
  }
};

const getAllOrdersByUserId = async (req, res, next) => {
  try {
    Customer.remove();
    const { uid } = req.params;
    Order.find({ "order.personInfos.userId": uid })
      .populate("order.item")
      .exec((err, order) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(order);
        }
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const placeOrder = async (req, res, next) => {
  try {
    const { customerInfos } = req.body;
    const { uid } = req.params;
    customerInfos.userId = uid;
    const customer = await Customer.findById(uid);
    const customerCart = customer.cart;
    const newOrder = await Order.create({
      order: {
        personInfos: customerInfos,
      },
    });
    newOrder.order.item = customerCart;
    await newOrder.save();

    customer.cart = [];
    await customer.save();
    res.status(200).json({
      message: "Your order has been submitted successfully.",
      newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getAllOrders = getAllOrders;
exports.getAllOrdersByUserId = getAllOrdersByUserId;
exports.placeOrder = placeOrder;
