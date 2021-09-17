const Product = require("../Models/Product");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductById = async (req, res, next) => {
  //Fect product with id
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (err) {
    res.json(err);
  }
};

const getProductByGender = async (req, res, next) => {
  try {
    const { gender } = req.params;
    const filteredProducts = await Product.find({
      "features.gender": gender,
    });
    console.log(filteredProducts);
    res.status(200).json(filteredProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProduct = async (req, res, next) => {
  //Create Product
  try {
    const colors = [
      { color: "blue", choosen: true },
      {
        color: "black",
        choosen: false,
      },
      {
        color: "green",
        choosen: false,
      },
    ];
    const { brand, price, onSale, description, image, features } = req.body;
    if (req.admin) {
      const product = await Product.create({
        brand,
        price,
        onSale,
        description,
        image,
        colors,
        pickedQty: 1,
        features,
      });
      res.status(200).json(product);
    } else {
      res.status(400).json("You are not authorized to do this.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { brand, price, onSale, description, image, features } = req.body;
    if (req.admin) {
      const updateProduct = await Product.findByIdAndUpdate(productId, {
        brand,
        price,
        description,
        image,
        features,
      });
      res.status(200).json(updateProduct);
    } else {
      res.status(400).json("You are not authorized to to this.");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    if (req.admin) {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndRemove(productId);
    } else {
      res.status(400).json("You are not authorized to do this.");
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.getProductByGender = getProductByGender;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
