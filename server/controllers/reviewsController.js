const Review = require("../Models/Review");
const Product = require("../Models/Product");
const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate({
      path: "userId",
      select: "username",
    });

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
    const curProductReviews = await Review.find({ productId });
    const curUserAlreadyRated = curProductReviews.some(
      (review) => review.userId.toString() === userId.toString()
    );
    if (curUserAlreadyRated) {
      res.status(400).json("One user can only give rating to product once.");
      return;
    } else {
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
        const returnReview = await Review.findById(newReview._id).populate({
          path: "userId",
          select: "username",
        });
        res.status(200).json(returnReview);
      } else {
      }
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
