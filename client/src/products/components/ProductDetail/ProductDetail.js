import React, { useState } from "react";

import "./ProductDetail.css";

import ProductDetailBody from "./ProductDetailBody/ProductDetailBody";
import ProductFeatures from "./ProductFeatures/ProductFeatures";

const ProductDetail = (props) => {
  let colorOptions;
  const product = props.productDetail;
  if (product && product.colors && product.colors.length > 0) {
    colorOptions = product.colors.map((c) => {
      return (
        <button
          onClick={(e) => props.productColorChosen(e, c._id)}
          className={`product-color ${c.choosen && "product-color-active"}`}
        >
          {c.color}
        </button>
      );
    });
  }
  if (!product) {
    return null;
  }
  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-detail__img-container">
          <img className="product-detail__img" src={product.image} />
          <div className="product-colors">{colorOptions}</div>
        </div>
        <ProductDetailBody product={product} />
        <ProductFeatures productFeatures={product.features} />
      </div>
    </div>
  );
};

export default ProductDetail;
