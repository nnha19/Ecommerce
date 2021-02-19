const Customer = require("../Modals/Customer");
const Cart = require("../Modals/Cart");
const Order = require("../Modals/Order");

const getAllOrders = async (req, res, next) => {
  try {
    const { uid } = req.params;

    Customer.findById(uid)
      .populate("order")
      .exec((err, customer) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(customer.order);
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
    const customer = await Customer.findById(uid);
    const customerCart = customer.cart;
    const newOrder = await Order.create({
      order: {
        personInfos: customerInfos,
      },
    });
    newOrder.order.item = customerCart;
    await newOrder.save();
    customer.order.push(newOrder);
    await customer.save();
    res.status(200).json(customer);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getAllOrders = getAllOrders;
exports.placeOrder = placeOrder;
