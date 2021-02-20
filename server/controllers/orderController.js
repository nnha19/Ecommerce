const Customer = require("../Modals/Customer");
const Cart = require("../Modals/Cart");
const Order = require("../Modals/Order");

const getAllOrdersByUserId = async (req, res, next) => {
  try {
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
    res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getAllOrdersByUserId = getAllOrdersByUserId;
exports.placeOrder = placeOrder;
