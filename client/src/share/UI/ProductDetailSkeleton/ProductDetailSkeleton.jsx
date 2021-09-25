import React from "react";

import "./ProductDetailSkeleton.css";

const ProductDetailSkeleton = (props) => {
  return (
    <div className="product-detail-skeleton-container">
      <div className="product-detail-skeleton">
        <div className="product-detail-skeleton__img"></div>
        <div className="product-detail-skeleton__overview">
          <div className="product-detail-skeleton__header">
            <p></p>
            <p></p>
            <button></button>
          </div>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div className="skeleton-sidebar"></div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
