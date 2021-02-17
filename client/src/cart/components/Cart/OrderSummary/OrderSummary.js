import React from "react";

import "./OrderSummary.css";

const OrderSummary = (props) => {
  return (
    <>
      <h5 className="order-summary__header">Order Summary</h5>
      <ul className="order-summary__lists">
        <li className="order-summary__list">
          <span className="order-summary__text">Subtotal(4 items)</span>
          <span className="order-summary__ks">Ks 40000</span>
        </li>
        <li className="order-summary__list">
          <span className="order-summary__text">Shipping Fee</span>
          <span className="order-summary__ks">Ks 2780</span>
        </li>
        <hr />
        <li className="order-summary__list total">
          <span className="order-summary__text">Total</span>
          <span className="order-summary__ks">Ks 2780</span>
        </li>
      </ul>
      <button className="order-summary__btn">Proceed To CheckOut</button>
    </>
  );
};

export default OrderSummary;
