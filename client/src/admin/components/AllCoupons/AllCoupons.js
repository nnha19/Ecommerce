import React from "react";

import "./AllCoupons.css";

import { useHistory } from "react-router-dom";

import DeleteCoupon from "./DeleteCoupon/DeleteCoupon";
import SecondaryBtn from "../../../share/components/SecondaryBtn/SecondaryBtn";

const AllCoupons = (props) => {
  const history = useHistory();
  let couponOutput;
  couponOutput = props.coupons.map((coupon, i) => {
    return (
      <tr className={(i + 1) % 2 === 0 && "special-style"} key={coupon._id}>
        <td>{coupon.code}</td>
        <td>{coupon.discountPrice} USD</td>
        <td>
          <SecondaryBtn
            clicked={() => history.push(`/admin/coupon/edit/${coupon._id}`)}
            className="coupon-edit__btn"
          >
            Edit
          </SecondaryBtn>
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
      <div className="coupon-container">
        <div className="coupon-wrapper">
          {props.coupons.length === 0 ? (
            <div className="error">
              <p>No Coupons</p>
            </div>
          ) : (
            <>
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
      </div>
    </>
  );
};

export default AllCoupons;
