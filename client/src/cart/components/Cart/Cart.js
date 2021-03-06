import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import ProductQuantity from "../../../products/components/ProductDetail/ProductDetailBody/ProductQuantity/ProductQuantity";
import RemoveItemFromCart from "./RemoveItemFromCart/RemoveItemFromCart";
import OrderSummary from "./OrderSummary/OrderSummary";
import AddToWhilist from "./AddToWhilist/AddToWhilist";
import Context from "../../../contexts/context";

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
            updateItemQuantity={updateItemQuantity(item)}
            product={item}
          />
          <div className="cart__item-update">
            <AddToWhilist />
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
        <div className="order-summary">
          <OrderSummary action="proceed to checkout" />
        </div>
      )}
    </div>
  );
};

export default Cart;
