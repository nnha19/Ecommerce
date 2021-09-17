import React, { useContext } from "react";
import Context from "../../../../contexts/context";
import AddToCart from "../ProductDetailBody/AddToCart/AddToCart";

import "./ProductFeatures.css";

const ProductFeatures = (props) => {
  const context = useContext(Context);
  const keys = Object.keys(props.productFeatures).map((featuresKey, i) => {
    let resultKey = featuresKey.replace(/([A-Z]+)/g, ",$1").replace(/^,/, "");
    resultKey = resultKey.split(",").join(" ").toLocaleLowerCase();

    return (
      <li className="product-features__list" key={featuresKey + i}>
        <span className="product-features__key">{resultKey}</span>
        <span className="product-features__value">
          {props.productFeatures[featuresKey]}
        </span>
      </li>
    );
  });

  return (
    <div className={`features-wrapper ${props.className}`}>
      <div
        className={`product-features ${
          props.showFeatures ? "show-features" : ""
        }`}
      >
        <h4 className="product-features__heading">Features</h4>
        <ul className="product-features__lists">{keys}</ul>
      </div>
      {!props.mobile && (
        <AddToCart
          itemQuantity={4}
          product={props.product}
          context={context}
          cartItemData={context.cartItemData}
          className="add-to-cart"
        >
          Add To Cart
        </AddToCart>
      )}
    </div>
  );
};

export default ProductFeatures;
