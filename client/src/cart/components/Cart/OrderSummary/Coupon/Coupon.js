import React, { useState } from "react";

import "./Coupon.css";

import SecondaryBtn from "../../../../../share/components/SecondaryBtn/SecondaryBtn";

const Coupon = (props) => {
  const [coupon, setCoupon] = useState("");
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const enteringCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const applyingCoupon = (e) => {
    e.preventDefault();
    setInvalidCoupon(true);
    setCoupon("");
  };

  if (invalidCoupon) {
    setTimeout(() => {
      setInvalidCoupon(false);
    }, 3000);
  }

  return (
    <>
      <form onSubmit={applyingCoupon} className="coupon">
        <input
          onChange={enteringCoupon}
          value={coupon}
          className="coupon__input"
          type="text"
          placeholder="Enter Coupon Code"
        />
        <SecondaryBtn className="coupon__btn">Apply</SecondaryBtn>
      </form>
      {invalidCoupon && <p className="form__err-msg">Invalid Coupon!</p>}
    </>
  );
};

export default Coupon;
