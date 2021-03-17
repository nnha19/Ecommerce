import React, { useContext, useEffect } from "react";

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

  useEffect(() => {
    error && setAppliedCoupon(null);
  }, [error]);

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

  const removeAppliedCouponHandler = () => {
    setAppliedCoupon(null);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, [3000]);
    }
  }, [error]);

  const clickedBtnHandler = () => {
    history.push("/checkout");
  };

  const shippingFee = "2470";
  const allTotalAmount = parseInt(totalAmount) + parseInt(shippingFee);
  let discountTotal;
  if (appliedCoupon) {
    discountTotal = allTotalAmount - appliedCoupon.discountPrice;
  }

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
            userId={context.curUser && context.curUser.userId}
            loading={loading}
            error={error}
            appliedCoupon={appliedCoupon}
            fetchData={(url, method, data) =>
              fetchData(url, method, data, context.token)
            }
          />
        )}
        {error && <p className="coupon-error">{error}</p>}
        {appliedCoupon && (
          <p className="applied-coupon">
            <span>
              <span className="coupon-code">{appliedCoupon.code}</span> Applied
            </span>
            <span>
              <span className="discount-price">
                {appliedCoupon.discountPrice}KS
              </span>
              &nbsp; off
            </span>
            <span
              onClick={removeAppliedCouponHandler}
              className="delete-coupon"
            >
              x
            </span>
          </p>
        )}
        <li className="total">
          <div className="total-price-container">
            <span className="order-summary__text">Total</span>
            <span
              className={`${
                appliedCoupon ? "original-price" : ""
              } order-summary__ks`}
            >
              {maniStr(allTotalAmount)} KS
            </span>
          </div>
          {discountTotal && (
            <p className="discount-price">{maniStr(discountTotal)} KS</p>
          )}
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
