import React, { useState, useEffect } from "react";

import "./OrderSummary.css";

const OrderSummary = (props) => {
  const [totalAmount, setTotalAmount] = useState(props.totalAmount);

  const maniStr = (amount) => {
    if (amount.length > 3) {
      let words = [];
      let w3 = "";
      amount
        .toString()
        .split("")
        .forEach((w, i) => {
          if (w3.length < 3) {
            w3 += w;
            if (amount.length === i + 1) {
              words.push(w3);
            }
          } else {
            words.push(w3);
            w3 = "";
          }
        });
      console.log(words);
      return words.join(",");
    } else {
      return amount;
    }
  };

  useEffect(() => {
    const total = maniStr(props.totalAmount);

    setTotalAmount(total);
  }, [props.totalAmount]);

  console.log(maniStr("99000"));

  const shippingFee = maniStr("24700");

  return (
    <>
      <h5 className="order-summary__header">Order Summary</h5>
      <ul className="order-summary__lists">
        <li className="order-summary__list">
          <span className="order-summary__text">Subtotal(4 items)</span>
          <span className="order-summary__ks">{totalAmount}</span>
        </li>
        <li className="order-summary__list">
          <span className="order-summary__text">Shipping Fee</span>
          <span className="order-summary__ks">{shippingFee}</span>
        </li>
        <hr />
        <li className="order-summary__list total">
          <span className="order-summary__text">Total</span>
          <span className="order-summary__ks">
            {parseInt(totalAmount) + parseInt(shippingFee)}
          </span>
        </li>
      </ul>
      <button className="order-summary__btn">{props.action}</button>
    </>
  );
};

export default OrderSummary;
