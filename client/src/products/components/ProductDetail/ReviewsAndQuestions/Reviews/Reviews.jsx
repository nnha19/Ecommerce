import React, { useContext } from "react";
import { ReviewsAndQuestionsContext } from "../../../../../contexts/reviewsAndQuestionsContext";

import "./Reviews.css";

const Reviews = (props) => {
  const { reviews } = useContext(ReviewsAndQuestionsContext);

  const arr = [5, 4, 3, 2, 1];

  const overallRatingDisplay = {};

  const overallRating = arr.map((star, i) => {
    let starCount = reviews.filter((review) => review.rating === star).length;
    overallRatingDisplay[star] = starCount;
    return (
      <div className="overall-rating" key={i}>
        <div>
          <span className="overall-rating__star">{star}</span>
          <i className="rating-star fas fa-star"></i>
        </div>
        <div>Progress Bar</div>
        <span>{starCount} </span>
      </div>
    );
  });
  let total = 0;
  for (let key in overallRatingDisplay) {
    total += key * overallRatingDisplay[key];
  }
  total = Math.round((total / reviews.length) * 10) / 10;

  const reviewLists =
    reviews &&
    !!reviews.length &&
    reviews.map((review) => {
      let stars = [];
      for (let i = 0; i < review.rating; i++) {
        stars.push(<i className="rating-star fas fa-star"></i>);
      }
      while (stars.length !== 5) {
        stars.push(<i className="rating-star far fa-star"></i>);
      }
      return (
        <div key={review._id} className="review">
          <div className="review-list__customer">
            <div className="customer-avatar">Avatar</div>
            <div>
              <h4 className="customer-name">Customer Name</h4>
              <div className="review-list__review">
                <div className="rating-stars">
                  {stars.map((star) => star)}
                  <span>({review.rating}/5)</span>
                </div>
                <p>{review.text}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div className="reviews">
      <div className="overall-ratings">
        <h4 className="overall-ratings__header">Ratings & Reviews</h4>
        <div className="overall-rating-container">
          <div className="total-rating">
            <p className="total-rating-score">
              {total}/5 <i className="rating-star fas fa-star"></i>
              <p className="total-ratings-count">{reviews.length} ratings</p>
            </p>
          </div>
          <div>{overallRating}</div>
        </div>
      </div>
      <div className="review-lists">{reviewLists}</div>
    </div>
  );
};

export default Reviews;
