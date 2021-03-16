import React, { useState } from "react";

import "./Coupon.css";

import SecondaryBtn from "../../../../../share/components/SecondaryBtn/SecondaryBtn";

const Coupon = (props) => {
  const [coupon, setCoupon] = useState("");

  const enteringCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const applyingCoupon = (e) => {
    e.preventDefault();
    const data = { code: coupon };
    props.fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/coupon/${props.userId}`,
      "post",
      data,
      props.token
    );
    setCoupon("");
  };

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
        <SecondaryBtn className="coupon__btn">
          {props.loading ? <span className="coupon-loading"></span> : "Apply"}
        </SecondaryBtn>
      </form>
    </>
  );
};

export default Coupon;
