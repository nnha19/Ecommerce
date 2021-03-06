import React from "react";

import "./Orderoutput.css";

const OrderOutput = (props) => {
  const orderOutput = props.order.map((order) => {
    const orderItems = order.order.item.map((order) => {
      return (
        <div key={order._id} className="order__list">
          <img className="cart__item-img" src={order.image} />
          <div className="order__body">
            <h4>{order.brand}</h4>
            <p className="cart__item-price order__item-price">
              {order.price} KS
            </p>
            <span>Qty :{order.pickedQty}</span>
          </div>
        </div>
      );
    });
    const objKeys = Object.keys(order.order.personInfos);
    const list = objKeys.map((objKey, i) => {
      return (
        <li key={i} className="order__list-item">
          <span className="order__list-key">{objKey}</span>
          <span className="order__list-value">
            {order.order.personInfos[objKey]}
          </span>
        </li>
      );
    });
    return (
      <div key={order._id} className="order">
        <div className="order__item">
          <h3 className="order__title">Order Items</h3>
          {orderItems}
        </div>
        <ul className="order__lists">
          <h4 className="order__date">2/23/2021</h4>
          <h4 className="order__title">Delivery Address</h4>
          {list}
        </ul>
      </div>
    );
  });
  return orderOutput;
};

export default OrderOutput;
