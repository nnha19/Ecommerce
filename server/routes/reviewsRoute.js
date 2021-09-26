const route = require("express").Router({ mergeParams: true });

const reviewsController = require("../controllers/reviewsController");

route.get("/", reviewsController.getReviewsByProductId);
route.post("/", reviewsController.createReviews);

module.exports = route;
