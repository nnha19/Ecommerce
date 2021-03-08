import React from "react";

import "./ProductFeatures.css";

const ProductFeatures = (props) => {
  console.log(props.showFeatures);
  const keys = Object.keys(props.productFeatures).map((featuresKey, i) => {
    return (
      <li className="product-features__list" key={featuresKey + i}>
        <span className="product-features__key">{featuresKey}</span>
        <span className="product-features__value">
          {props.productFeatures[featuresKey]}
        </span>
      </li>
    );
  });

  return (
    <div
      className={`product-features ${
        props.showFeatures ? "show-features" : ""
      }`}
    >
      <h4 className="product-features__heading">Features</h4>
      <ul className="product-features__lists">{keys}</ul>
    </div>
  );
};

export default ProductFeatures;
