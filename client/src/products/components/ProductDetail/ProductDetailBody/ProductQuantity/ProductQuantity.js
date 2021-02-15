import React, { useContext } from "react";

import "./ProductQuantity.css";

const ProductQuantity = (props) => {
  const product = props.product;
  const addDisableCart =
    product.pickedQty === parseInt(product.features.inStock);
  const subtractDisableCart =
    props.type === "body" ? props.itemQuantity === 1 : product.pickedQty === 1;

  return (
    <div className="product-detail__quantity">
      <span className="quantity-text">Quantity</span>
      <button
        disabled={
          props.itemQuantity === product.features.inStock || addDisableCart
        }
        className="quantity-btn"
        onClick={() => props.updateItemQuantity("add")}
      >
        <i className="fas fa-plus add"></i>
      </button>
      <span className="quantity">
        {props.itemQuantity || product.pickedQty}
      </span>
      <button
        className="quantity-btn"
        disabled={props.itemQuantity === 1 || subtractDisableCart}
        onClick={() => props.updateItemQuantity("subtract")}
      >
        <i className="fas fa-minus subtract"></i>
      </button>
    </div>
  );
};

export default ProductQuantity;
