import React, { useState } from "react";

import "./ProductQuantity.css";

const ProductQuantity = (props) => {
  const product = props.product;

  const [itemQuantity, setItemQuantity] = useState(props.product.pickedQty);

  const updateQuantityHandler = (type) => {
    type === "add"
      ? setItemQuantity((prev) => prev + 1)
      : setItemQuantity((prev) => prev - 1);
  };
  return (
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
  );
};

export default ProductQuantity;
