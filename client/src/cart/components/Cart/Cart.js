import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import ProductQuantity from "../../../products/components/ProductDetail/ProductDetailBody/ProductQuantity/ProductQuantity";
import RemoveItemFromCart from "./RemoveItemFromCart/RemoveItemFromCart";
import OrderSummary from "./OrderSummary/OrderSummary";
import Context from "../../../contexts/context";
import SecondaryBtn from "../../../share/components/SecondaryBtn/SecondaryBtn";

import "./Cart.css";

const Cart = (props) => {
  const history = useHistory();
  const context = useContext(Context);
  const cartItems = context.cartItemData.cartItem;

  const viewDetailProductHandler = (e, id) => {
    if (
      !e.target.closest(".product-detail__quantity") &&
      !e.target.closest(".cart__item-update")
    ) {
      history.push(`/product/${id}`);
    }
  };

  const updateItemQuantity = (item) => {
    if (props.updateItemQuantity) {
      return (type) => props.updateItemQuantity(type, item);
    } else {
      return null;
    }
  };

  let cartItemsOutput;
  if (cartItems && cartItems.length > 0) {
    cartItemsOutput = cartItems.map((item) => {
      const cartItem = { ...item.cartItem, pickedQty: item.pickedQty };

      return (
        <div
          key={item._id}
          onClick={(e) => viewDetailProductHandler(e, cartItem._id)}
          className="cart__item"
        >
          <div className="cart__item-about">
            <img
              className="cart__item-img"
              src={`${process.env.REACT_APP_BACKEND_URL}/${cartItem.imgs[0]}`}
            />
            <div className="cart__item-features">
              <h4 className="cart__item-name">
                {cartItem.brand}/{cartItem.features.gender}
              </h4>
              <p className="cart__item-price">{cartItem.price} USD</p>
              <p className="cart__item-instock">
                {cartItem.features.inStock} in stock
              </p>
            </div>
          </div>
          <ProductQuantity
            updateItemQuantity={updateItemQuantity(item)}
            product={cartItem}
            pickedQty={item.pickedQty}
          />
          <div className="cart__item-update">
            <RemoveItemFromCart item={item} />
          </div>
        </div>
      );
    });
  }

  return (
    <div className={`cart-container ${props.className}`}>
      <div className="cart">{cartItemsOutput}</div>
      {!props.checkout && (
        <div className="order-summary cart-order-summary">
          <OrderSummary action="proceed to checkout" />
        </div>
      )}
      {!props.checkout && (
        <SecondaryBtn
          clicked={() => history.push("/checkout")}
          className="mobile-ptc"
        >
          Proceed to Checkout
        </SecondaryBtn>
      )}
    </div>
  );
};

export default Cart;
