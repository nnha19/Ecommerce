import React from "react";

import AddToCart from "../ProductDetail/ProductDetailBody/AddToCart/AddToCart";

import "./StickyCTA.css";

const StickyCTA = ({ product, inView }) => {
  return !inView ? (
    <div className="sticky-cta">
      <img src={product.imgs[0]} />
      <h3>{product.brand}</h3>
      <p className="sticky-cta__price">{product.price} USD</p>
      <AddToCart itemQuantity={1} product={product} className="add-to-cart">
        Add To Cart
      </AddToCart>
    </div>
  ) : null;
};
export default StickyCTA;
