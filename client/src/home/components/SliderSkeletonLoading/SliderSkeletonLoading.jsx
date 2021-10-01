import React from "react";

import "./SliderSkeletonLoading.css";

const SliderSkeletonLoading = () => {
  const skeletonList = Array.from(new Array(10)).map((p, i) => {
    return (
      <div key={i} className="skeleton slider-skeleton">
        <div id="skeleton-animation">
          <div className="skeleton__img"></div>
          <div className="skeleton__content">
            <h2></h2>
            <p></p>
            <p></p>
            <div></div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="slider-skeleton-container">
      <div className="slider-skeletons">{skeletonList}</div>
    </div>
  );
};

export default SliderSkeletonLoading;
