import React, { useState } from "react";

import ProductDetailBody from "../ProductDetail/ProductDetailBody/ProductDetailBody";
import ProductFeatures from "../ProductDetail/ProductFeatures/ProductFeatures";
import AddToCart from "../ProductDetail/ProductDetailBody/AddToCart/AddToCart";

import "./MobileProductContent.css";

const MobileProductContent = ({ product }) => {
  const [toggleHeader, setToggleHeader] = useState("overview");

  const toggleHeaderHandler = (toggle) => {
    setToggleHeader(toggle);
  };

  return (
    <div className="mobile toggle-container">
      <div className="toggle-headers">
        <h5
          className={`${
            toggleHeader === "overview" ? "active-toggle-header" : ""
          }`}
          onClick={() => toggleHeaderHandler("overview")}
        >
          Product Overview
        </h5>
        <h5
          className={`${
            toggleHeader !== "overview" ? "active-toggle-header" : ""
          }`}
          onClick={() => toggleHeaderHandler("features")}
        >
          Product Features
        </h5>
      </div>
      <div className="toggle-result">
        {toggleHeader === "overview" ? (
          <ProductDetailBody product={product} />
        ) : (
          <ProductFeatures
            product={product}
            className="mobile-feature"
            mobile={true}
          />
        )}
        <AddToCart
          itemQuantity={1}
          product={product}
          className="add-to-cart mobile"
        >
          Add To Cart
        </AddToCart>
      </div>
    </div>
  );
};

export default MobileProductContent;
