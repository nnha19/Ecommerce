import React, { useContext } from "react";

import "./OrderSummary.css";

import Context from "../../../../contexts/context";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../../../customHooks/useHttp";

import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";
import Coupon from "./Coupon/Coupon";

const OrderSummary = (props) => {
  const [
    appliedCoupon,
    loading,
    error,
    fetchData,
    setAppliedCoupon,
    setError,
  ] = useHttp(null);

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
      return words.join(",");
    } else {
      return amount;
    }
  };

  const clickedBtnHandler = () => {
    history.push("/checkout");
  };

  console.log(appliedCoupon);

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
        {props.checkout && (
          <Coupon
            userId={context.curUser.userId}
            loading={loading}
            error={error}
            appliedCoupon={appliedCoupon}
            fetchData={(url, method, data, token) =>
              fetchData(url, method, data, token)
            }
          />
        )}
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
