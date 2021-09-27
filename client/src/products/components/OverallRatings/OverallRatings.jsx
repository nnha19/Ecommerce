import React from "react";

import calOverallRating from "../../../functions/calOverallRating";

const OverallRatings = ({ reviews, style }) => {
  const overallRating = calOverallRating(reviews);
  return (
    <div style={style} className="stars">
      <span className="product__overall-rating">{overallRating}/5</span>
      <i className="rating-star fas fa-star"></i>
      <i className="rating-star fas fa-star"></i>
      <i className="rating-star fas fa-star"></i>
      <i className="rating-star fas fa-star"></i>
      <i className="rating-star fas fa-star"></i>
      <span>({reviews.length})</span>
    </div>
  );
};
export default OverallRatings;
