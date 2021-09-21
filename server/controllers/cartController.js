const Customer = require("../Models/Customer");
const Cart = require("../Models/Cart");

const getAllItemsFromCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const customer = await Customer.findById(userId).populate({
      path: "cart",
      populate: { path: "cartItem" },
    });
    res.status(200).json(customer.cart);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const createCartItem = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const userId = req.params.id;
    const customer = await Customer.findById(userId).populate({
      path: "cart",
      populate: { path: "cartItem" },
    });
    if (customer) {
      const cartItemExist = customer.cart.some(
        (cart) => cart.cartItem._id.toString() === productId
      );
      if (cartItemExist) {
        res.status(400).json("This item already exists in the cart.");
      } else {
        const cartItem = await Cart.create({
          cartItem: productId,
          pickedQty: 1,
        });
        customer.cart.push(cartItem);
        await customer.save();
        const cust = await Customer.findById(userId).populate({
          path: "cart",
          populate: { path: "cartItem" },
        });
        res.status(200).json(cust.cart);
      }
    } else {
      res.status(400).json(err);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { type } = req.body;
    const { cartItemId, userId } = req.params;

    const cartItem = await Cart.findById(cartItemId);

    cartItem.pickedQty =
      type === "add" ? cartItem.pickedQty + 1 : cartItem.pickedQty - 1;
    await cartItem.save();

    const customer = await Customer.findById(userId).populate({
      path: "cart",
      populate: { path: "cartItem" },
    });
    res.status(200).json(customer.cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const customer = await Customer.findById(userId).populate({
      path: "cart",
      populate: { path: "cartItem" },
    });
    const { cartItemId } = req.params;
    const deleteCartItem = customer.cart.filter(
      (c) => c._id.toString() !== cartItemId
    );
    await Cart.findByIdAndDelete(cartItemId);
    customer.cart = deleteCartItem;
    await customer.save();
    res.status(200).json(deleteCartItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllItemsFromCart = getAllItemsFromCart;
exports.createCartItem = createCartItem;
exports.updateCartItem = updateCartItem;
exports.deleteCartItem = deleteCartItem;
