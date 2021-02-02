import React, { useState } from "react";

import "./ProductDetailBody.css";
import Button from "../../../../share/components/button/button";

const ProductDetailBody = (props) => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const updateQuantityHandler = (type) => {
    type === "add"
      ? setItemQuantity((prev) => prev + 1)
      : setItemQuantity((prev) => prev - 1);
  };

  const product = props.product;
  return (
    <div className="product-detail__body">
      <p className="product-detail__price">{product.price} KS</p>
      <p>{product.description}</p>
      <div className="product-detail__cart">
        <div className="product-detail__quantity">
          <span className="quantity-text">Quantity</span>
          <button
            disabled={itemQuantity === product.features.inStock}
            className="quantity-btn"
            onClick={() => updateQuantityHandler("add")}
          >
            <i className="fas fa-plus add "></i>
          </button>
          <span className="quantity">{itemQuantity}</span>
          <button
            className="quantity-btn"
            disabled={itemQuantity === 1}
            onClick={() => updateQuantityHandler("subtract")}
          >
            <i className="fas fa-minus subtract"></i>
          </button>
        </div>
        <Button className="product-detail__btn cart">Add To Cart</Button>
        <Button className="product-detail__btn checkout">Checkout</Button>
      </div>
    </div>
  );
};

export default ProductDetailBody;
