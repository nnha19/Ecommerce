import React, { useContext } from "react";
import { ReviewsAndQuestionsContext } from "../../../../../contexts/reviewsAndQuestionsContext";

import "./Reviews.css";

const Reviews = (props) => {
  const { reviews } = useContext(ReviewsAndQuestionsContext);

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
        <div className="review">
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
      <div>Over all Reviews</div>
      <div className="review-lists">{reviewLists}</div>
    </div>
  );
};

export default Reviews;
