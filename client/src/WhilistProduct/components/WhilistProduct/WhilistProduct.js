import React from "react";

import "./WhilistProduct.css";

import RemoveWhilistProduct from "./RemoveWhilistProduct/RemoveWhilistProduct";
import AddToCart from "./AddToCart/AddToCart";

const WhilistProduct = (props) => {
  console.log(props.whilistProduct);
  const whilistProductOutput = props.whilistProduct.map((whilistProduct) => {
    return (
      <div className="cart__item">
        <div className="cart__item-about whilist-first">
          <img className="cart__item-img" src={whilistProduct.image} />
          <div className="cart__item-features">
            <h4 className="cart__item-name">{whilistProduct.brand}</h4>
            <p className="cart__item-price">{whilistProduct.price}</p>
            <p className="cart__item-instock">
              {whilistProduct.features.inStock} in stock
            </p>
          </div>
        </div>
        <div className="whilist-second">
          <RemoveWhilistProduct />
          <AddToCart />
        </div>
      </div>
    );
  });

  return (
    <div className="whilist">
      <h4>Your favouritee products</h4>
      <div className="whilist-product-container">
        <h6>Remove All</h6>
        {whilistProductOutput}
      </div>
    </div>
  );
};

export default WhilistProduct;
