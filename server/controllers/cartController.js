const Cart = require("../Modals/Cart");
const Product = require("../Modals/Product");

const getAllItemsFromCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.find({});
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createCartItem = async (req, res, next) => {
  try {
    const {
      cartItemId,
      brand,
      color,
      price,
      gender,
      pickedQty,
      inStock,
      image,
    } = req.body;

    const cartItem = await Cart.create({
      cartItemId,
      brand,
      color,
      price,
      gender,
      pickedQty,
      inStock,
      image,
    });
    res.send(cartItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllItemsFromCart = getAllItemsFromCart;
exports.createCartItem = createCartItem;
