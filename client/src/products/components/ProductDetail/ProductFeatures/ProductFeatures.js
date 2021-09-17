import React, { useContext } from "react";
import AddToCart from "../ProductDetailBody/AddToCart/AddToCart";

import "./ProductFeatures.css";

const ProductFeatures = ({ product, className, showFeatures, mobile }) => {
  const keys = Object.keys(product.features).map((featuresKey, i) => {
    let resultKey = featuresKey.replace(/([A-Z]+)/g, ",$1").replace(/^,/, "");
    resultKey = resultKey.split(",").join(" ").toLocaleLowerCase();

    return (
      <li className="product-features__list" key={featuresKey + i}>
        <span className="product-features__key">{resultKey}</span>
        <span className="product-features__value">
          {product.features[featuresKey]}
        </span>
      </li>
    );
  });

  return (
    <div className={`features-wrapper ${className}`}>
      <div
        className={`product-features ${showFeatures ? "show-features" : ""}`}
      >
        <h4 className="product-features__heading">Features</h4>
        <ul className="product-features__lists">{keys}</ul>
      </div>
      {!mobile && (
        <AddToCart itemQuantity={1} product={product} className="add-to-cart">
          Add To Cart
        </AddToCart>
      )}
    </div>
  );
};

export default ProductFeatures;
