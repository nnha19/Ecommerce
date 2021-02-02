import React from "react";

import "./ProductFeatures.css";

const ProductFeatures = (props) => {
  const keys = Object.keys(props.productFeatures).map((featuresKey) => {
    return (
      <li className="product-features__list">
        <span className="product-features__key">{featuresKey}</span>
        <span className="product-features__value">
          {props.productFeatures[featuresKey]}
        </span>
      </li>
    );
  });

  return (
    <div className="product-features">
      <h4 className="product-features__heading">Features</h4>
      <ul className="product-features__lists">{keys}</ul>
    </div>
  );
};

export default ProductFeatures;
