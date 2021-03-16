import React from "react";

import "./AllCoupons.css";

const AllCoupons = (props) => {
  let couponOutput;

  if (props.coupons.length === 0) {
    couponOutput = (
      <div>
        <p>No Coupons</p>;
      </div>
    );
  } else {
    couponOutput = props.coupons.map((coupon) => {
      return (
        <div key={coupon._id} className="coupon-output">
          <span>{coupon.code}</span>
          <span>{coupon.discountPrice}</span>
          <div className="coupon-mani"></div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="coupon-wrapper">
        <h4>All Coupons</h4>

        <div className="coupons">{couponOutput}</div>
      </div>
    </>
  );
};

export default AllCoupons;
