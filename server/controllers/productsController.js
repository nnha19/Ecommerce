const Product = require("../Modals/Product");

const ErrorHandler = require("../handleError/handleError");

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

const createProduct = async (req, res, next) => {
  //Create Product
  try {
    const {
      brand,
      price,
      onSale,
      description,
      image,
      colors,
      features,
    } = req.body;
    const product = await Product.create({
      brand,
      price,
      onSale,
      description,
      image,
      colors,
      features,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
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

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.getProductByGender = getProductByGender;
