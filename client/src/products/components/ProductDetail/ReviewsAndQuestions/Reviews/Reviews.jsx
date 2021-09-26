import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { ReviewsAndQuestionsContext } from "../../../../../contexts/reviewsAndQuestionsContext";

import "./Reviews.css";
import calOverallRating from "../../../../../functions/calOverallRating";

const Reviews = (props) => {
  const [ratings, setRatings] = useState({});
  const { reviews } = useContext(ReviewsAndQuestionsContext);

  const arr = [1, 2, 3, 4, 5];

  useEffect(() => {
    const obj = {};
    arr.forEach((num) => {
      const count = reviews.filter((review) => review.rating === num).length;
      obj[num] = count;
    });
    setRatings(obj);
  }, [reviews]);

  const overallRating = Object.keys(ratings)
    .reverse()
    .map((key, i) => {
      let percentage = (ratings[key] / reviews.length) * 100;
      if (reviews.length < 1) {
        percentage = 0;
      }

      return (
        <div className="overall-rating" key={i}>
          <div>
            <span className="overall-rating__star">{key}</span>
            <i className="rating-star fas fa-star"></i>
          </div>
          <div className="progress-bar">
            <ProgressBar
              borderRadius={0}
              bgColor="#008000"
              completed={percentage}
            />
          </div>
          <span>{ratings[key]} </span>
        </div>
      );
    });

  //calculating overall rating
  const total = calOverallRating(reviews);

  //========

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
          <div className="overall-rating-display">{overallRating}</div>
        </div>
      </div>
      <div className="review-lists">{reviewLists}</div>
    </div>
  );
};

export default Reviews;
