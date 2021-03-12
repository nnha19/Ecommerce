import React, { useState, useEffect, useContext } from "react";

import "./OrderSummary.css";

import Context from "../../../../contexts/context";
import { useHistory } from "react-router-dom";

import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";
import Coupon from "./Coupon/Coupon";

const OrderSummary = (props) => {
  const context = useContext(Context);
  const totalAmount = context.totalAmount;
  const history = useHistory();

  const maniStr = (amount) => {
    if (!amount) {
      return;
    }
    amount = amount.toString();
    if (amount.length > 3) {
      let words = [];
      let w3 = "";
      amount.split("").forEach((w, i) => {
        w3 += w;
        if (w3.length === 3) {
          words.push(w3);
          w3 = "";
        } else if (amount.length - 1 === i) {
          words.push(w3);
          w3 = "";
        }
      });
      console.log(words);
      return words.join(",");
    } else {
      console.log(amount);
      return amount;
    }
  };

  const clickedBtnHandler = () => {
    history.push("/checkout");
  };

  const shippingFee = "2470";

  return (
    <>
      <h5 className="order-summary__header">Order Summary</h5>
      <ul className="order-summary__lists">
        <li className="order-summary__list">
          <span className="order-summary__text">
            Subtotal({context.cartItemAmount} items)
          </span>
          <span className="order-summary__ks">{maniStr(totalAmount)} KS</span>
        </li>
        <li className="order-summary__list">
          <span className="order-summary__text">Shipping Fee</span>
          <span className="order-summary__ks">{shippingFee} KS</span>
        </li>
        <hr />
        {props.checkout && <Coupon />}
        <li className="order-summary__list total">
          <span className="order-summary__text">Total</span>
          <span className="order-summary__ks">
            {maniStr(parseInt(totalAmount) + parseInt(shippingFee))} KS
          </span>
        </li>
      </ul>
      <SecondaryBtn
        disabled={props.disabled}
        clicked={props.clicked || clickedBtnHandler}
      >
        {props.action}
      </SecondaryBtn>
    </>
  );
};

export default OrderSummary;
