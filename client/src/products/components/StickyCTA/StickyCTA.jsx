import React from "react";

import AddToCart from "../ProductDetail/ProductDetailBody/AddToCart/AddToCart";

import "./StickyCTA.css";

const StickyCTA = ({ product, inView }) => {
  return !inView ? (
    <div className="sticky-cta">
      <div className="sticky-cta__img-brand">
        <img src={`${process.env.REACT_APP_BACKEND_URL}/${product.imgs[0]}`} />
        <h3>{product.brand}</h3>
      </div>
      <div className="sticky-cta__atc-price">
        <AddToCart
          itemQuantity={1}
          product={product}
          className="sticky-cta__add-to-cart add-to-cart"
        >
          Add To Cart
        </AddToCart>
        <p className="sticky-cta__price">{product.price} USD</p>
      </div>
    </div>
  ) : null;
};
export default StickyCTA;
