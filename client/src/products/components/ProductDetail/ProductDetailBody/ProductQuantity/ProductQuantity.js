import React, { useContext } from "react";

import "./ProductQuantity.css";

import Context from "../../../../../contexts/context";

const ProductQuantity = (props) => {
  const context = useContext(Context);
  const product = props.product;
  const addDisableCart =
    product.pickedQty === parseInt(product.features.inStock);
  const subtractDisableCart =
    props.type === "body" ? props.itemQuantity === 1 : product.pickedQty === 1;

  const updateItemQuantity = (type, cartItem) => {
    const data = {
      type,
    };
    if (
      (type === "add" && cartItem.features.inStock > cartItem.pickedQty) ||
      (type === "subtract" && cartItem.pickedQty > 1)
    ) {
      context.cartItemData.fetchData(
        `${process.env.REACT_APP_BACKEND_URL}/cart/update-cart-item/${cartItem._id}/${context.curUser.userId}`,
        "put",
        data
      );
    }
    context.updateCartItemAmount();
  };

  return (
    <div className="product-detail__quantity">
      <span className="quantity-text">Quantity</span>
      <button
        disabled={
          props.itemQuantity === product.features.inStock || addDisableCart
        }
        className="quantity-btn"
        onClick={() =>
          props.updateItemQuantity
            ? props.updateItemQuantity("add")
            : updateItemQuantity("add", props.product)
        }
      >
        <i className="fas fa-plus add"></i>
      </button>
      <span className="quantity">
        {props.itemQuantity || product.pickedQty}
      </span>
      <button
        className="quantity-btn"
        disabled={props.itemQuantity === 1 || subtractDisableCart}
        onClick={() =>
          props.updateItemQuantity
            ? props.updateItemQuantity("subtract")
            : updateItemQuantity("subtract", props.product)
        }
      >
        <i className="fas fa-minus subtract"></i>
      </button>
    </div>
  );
};

export default ProductQuantity;
