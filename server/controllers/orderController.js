const Customer = require("../Models/Customer");
const Order = require("../Models/Order");

const getAllOrders = async (req, res, next) => {
  const { uid } = req.params;

  const user = await Customer.findById(uid);
  if (!user.admin) {
    res.status(400).json("You don't have access to that route");
  } else {
    if (req.admin) {
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
    } else {
      res.status(400).json("You are not authorized.");
    }
  }
};

const getAllOrdersByUserId = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const orders = await Order.find({
      "order.personInfos.userId": uid,
    }).populate({
      path: "order.item",
      populate: { path: "cartItem" },
    });

    res.status(200).json(orders);
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
