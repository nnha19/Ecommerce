const Product = require("../Models/Product");
const fs = require("fs");

//Delete images if error occur.
function deleteFile(filePath) {
  fs.stat(filePath, (err, suc) => {
    if (err) {
      console.log(err);
    } else {
      fs.unlink(filePath, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
    }
  });
}

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate({
      path: "reviews",
    });
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
    res.status(200).json(filteredProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProduct = async (req, res, next) => {
  //Create Product
  try {
    const productDetail = JSON.parse(req.body.productDetail);
    const imgs = req.files.map((file) => file.path);
    const { brand, price, description, features } = productDetail;
    if (req.admin) {
      const product = await Product.create({
        brand,
        price,
        description,
        features,
        imgs,
        reviews: [],
        questions: [],
      });
      res.status(200).json(product);
    } else {
      imgs.forEach((img) => deleteFile(`${img}`));
      res.status(400).json("You are not authorized to do this.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productDetail = JSON.parse(req.body.productDetail);
    const imgs = req.files.map((file) => file.path);
    const productId = req.params.id;
    const { brand, price, onSale, description, image, features } =
      productDetail;
    if (req.admin) {
      const updateProduct = await Product.findByIdAndUpdate(productId, {
        brand,
        price,
        description,
        imgs,
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
