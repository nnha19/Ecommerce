import React from "react";
import { useHistory } from "react-router-dom";

import ProductQuantity from "../../../products/components/ProductDetail/ProductDetailBody/ProductQuantity/ProductQuantity";
import CartItemUpdate from "../Cart/CartItemUpdate/CartItemUpdate";
import OrderSummary from "./OrderSummary/OrderSummary";

import "./Cart.css";
const Cart = (props) => {
  console.log(props.cartItems);
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
  if (props.cartItems.length > 0) {
    cartItemsOutput = props.cartItems.map((item) => {
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
          <ProductQuantity
            updateItemQuantity={(type) => props.updateItemQuantity(type, item)}
            product={item}
          />
          <CartItemUpdate
            updateRespData={(data) => props.updateRespData(data)}
            item={item}
          />
        </div>
      );
    });
  }

  return (
    <div className="cart-container">
      <div className="cart">{cartItemsOutput}</div>
      <div className="order-summary">
        <OrderSummary action="proceed to checkout" />
      </div>
    </div>
  );
};

export default Cart;
