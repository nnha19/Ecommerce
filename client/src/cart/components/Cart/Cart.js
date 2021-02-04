import React from "react";
import { Link, useHistory } from "react-router-dom";

import ProductQuantity from "../../../products/components/ProductDetail/ProductDetailBody/ProductQuantity/ProductQuantity";
import CartItemUpdate from "../Cart/CartItemUpdate/CartItemUpdate";

import "./Cart.css";
const Cart = (props) => {
  const history = useHistory();
  const viewDetailProductHandler = (e, id) => {
    if (
      !e.target.closest(".product-detail__quantity") &&
      !e.target.closest(".cart__item-update")
    ) {
      history.push(`/product/${id}`);
    }
  };
  let cartItemsOutput;
  if (props.cartItems) {
    cartItemsOutput = props.cartItems.map((item) => {
      console.log(item);
      return (
        <div
          key={item._id}
          onClick={(e) => viewDetailProductHandler(e, item.productId)}
          className="cart__item"
        >
          <div className="cart__item-about">
            <img className="cart__item-img" src={item.image} />
            <div className="cart__item-features">
              <h4 className="cart__item-name">
                {item.brand}/{item.features.gender}
              </h4>
              <p className="cart__item-price">{item.price} KS</p>
              <p className="cart__item-instock">
                {item.features.inStock} instock
              </p>
            </div>
          </div>
          <ProductQuantity product={item} />
          <CartItemUpdate />
        </div>
      );
    });
  }

  return (
    <div className="cart-container">
      <div className="cart">{cartItemsOutput}</div>
    </div>
  );
};

export default Cart;
