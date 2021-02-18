import React from "react";

import "./Checkout.css";

import OrderSummary from "../Cart/OrderSummary/OrderSummary";

const Checkout = (props) => {
  return (
    <div className="checkout-container">
      <div className="checkout">
        <div className="checkout__delivery-infos">
          <h4>Delivery Information</h4>
        </div>
        <div className="order-summary">
          <OrderSummary checkout={true} action="place order" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
