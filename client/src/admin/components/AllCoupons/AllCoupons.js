import React from "react";

import "./AllCoupons.css";

import DeleteCoupon from "./DeleteCoupon/DeleteCoupon";
import SecondaryBtn from "../../../share/components/SecondaryBtn/SecondaryBtn";

const AllCoupons = (props) => {
  let couponOutput;

  couponOutput = props.coupons.map((coupon) => {
    return (
      <tr>
        <td>{coupon.code}</td>
        <td>{coupon.discountPrice}</td>
        <td>
          <SecondaryBtn className="coupon-edit__btn">Edit</SecondaryBtn>
        </td>
        <td>
          <DeleteCoupon
            deleteOneCoupon={(couponId) => props.deleteOneCoupon(couponId)}
            couponId={coupon._id}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="coupon-wrapper">
        {props.coupons.length === 0 ? (
          <div className="error">
            <p>No Coupons</p>
          </div>
        ) : (
          <>
            <h4>All Coupons</h4>
            <table className="table">
              <tr>
                <th>Coupon Code</th>
                <th>Discount Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {couponOutput}
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default AllCoupons;
