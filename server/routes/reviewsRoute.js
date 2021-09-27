const authMiddleware = require("../middlewares/authMiddleware");
const route = require("express").Router({ mergeParams: true });

const reviewsController = require("../controllers/reviewsController");

route.get("/", reviewsController.getReviewsByProductId);
route.post("/", authMiddleware, reviewsController.createReviews);

module.exports = route;
