const Review = require("../Models/Review");
const Product = require("../Models/Product");
const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const { userId, text, rating } = req.body;
    const newReview = await Review.create({
      text,
      userId,
      productId,
      rating,
      timeStamp: new Date(),
    });
    if (newReview) {
      product.reviews.push(newReview);
      await product.save();
      res.status(200).json(newReview);
    } else {
      console.log("Something went wrong.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateReviews = (req, res) => {};
const deleteReviews = (req, res) => {};

exports.getReviewsByProductId = getReviewsByProductId;
exports.createReviews = createReviews;
exports.updateReviews = updateReviews;
exports.deleteReviews = deleteReviews;
