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

async function createProducts() {
  const products = await Product.find({});
  const pRN = Math.floor(Math.random() * products.length);
  const imgs = products[pRN].imgs;

  const brands = "Ray Band,AO,Okaley,Dior".split(",");
  const prices = [
    325, 400, 500, 1200, 800, 456, 241, 80, 20, 60, 300, 2000, 900,
  ];
  const genders = ["Male", "Female", "Unisex"];
  const sizes = ["Medium", "Large", "Small", "Free Size"];

  function chooseRandomly(arr) {
    const rn = Math.floor(Math.random() * arr.length);
    return arr[rn];
  }
  const newProduct = await Product.create({
    brand: chooseRandomly(brands),
    price: chooseRandomly(prices),
    imgs,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    features: {
      gender: chooseRandomly(genders),
      inStock: Math.floor(Math.random() * 100),
      cashOnDelivery: "Available",
      warranty: "1 year warranty",
      size: chooseRandomly(sizes),
      return: "7 days return available",
      uv: 400,
    },
    reviews: [],
    buyers: [],
  });
  if (newProduct) {
    console.log("Succeded");
  }
}
//create products randomly
// for (let i = 0; i < 200; i++) {
//   createProducts();
// }

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

const getRandomProducts = async (req, res) => {
  const count = req.params.count || 10;
  const randomProducts = [];
  const allProducts = await Product.find({});
  while (randomProducts.length < count) {
    const rn = Math.floor(Math.random() * allProducts.length);
    randomProducts.push(allProducts[rn]);
  }
  res.status(200).json(randomProducts);
};

const getProductsByFilterValue = async (req, res) => {
  try {
    const { filterField } = req.body;

    const filterKeys = Object.keys(filterField);
    if (filterKeys.length === 0 || filterField[filterKeys[0]].length < 1) {
      const allProducts = await Product.find({});
      res.status(200).json(allProducts);
      return;
    }

    const mongooseFindArr = [];
    for (let key in filterField) {
      if (key === "gender" || key === "size") {
        const optVals = [];
        const objKey = `features.${key}`;
        filterField[key].forEach((v) => optVals.push(new RegExp(v, "i")));
        mongooseFindArr.push({
          [objKey]: { $in: optVals },
        });
      } else if (key === "price") {
        mongooseFindArr.push({
          [key]: {
            $lt: parseInt(filterField[key][filterField[key].length - 1]),
          },
        });
      } else {
        const optVals = [];
        filterField[key].forEach((val) => optVals.push(new RegExp(val, "i")));

        mongooseFindArr.push({ [key]: { $in: optVals } });
      }
    }
    const filteredProducts = await Product.find({
      $and: mongooseFindArr,
    });

    res.status(200).json(filteredProducts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
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
      const oldProduct = await Product.findById(productId);
      const updateProduct = await Product.findByIdAndUpdate(productId, {
        brand,
        price,
        description,
        imgs: imgs.length < 1 ? oldProduct.imgs : imgs,
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
exports.getRandomProducts = getRandomProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.getProductByGender = getProductByGender;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductsByFilterValue = getProductsByFilterValue;
