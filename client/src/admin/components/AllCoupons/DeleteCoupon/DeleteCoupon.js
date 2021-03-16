import React, { useState, useContext } from "react";

import axios from "axios";

import "./DeleteCoupon.css";

import Modal from "../../../../share/UI/Modal/Modal";
import Button from "../../../../share/components/button/button";
import Context from "../../../../contexts/context";

const DeleteCoupon = (props) => {
  const context = useContext(Context);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowDeleteWarning(true);
  };

  const cancelDeleteCouponHandler = () => {
    setShowDeleteWarning(false);
  };

  const deleteCouponHandler = async () => {
    try {
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/coupon/${props.couponId}`,
        method: "delete",
        headers: {
          Authorization: context.token,
        },
      });
      console.log(resp);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <Modal
        modalShow={showDeleteWarning}
        hideModal={cancelDeleteCouponHandler}
        title="Are you sure you want to delete this coupon?"
        body={
          <>
            <Button clicked={deleteCouponHandler} className="delete-coupon-btn">
              Sure
            </Button>
            <Button
              clicked={cancelDeleteCouponHandler}
              className="cancel-coupon-btn"
            >
              Cancel
            </Button>
          </>
        }
      />
      <i
        onClick={showDeleteWarningHandler}
        className="fas fa-trash cart__item-delete cart__item-icons"
      ></i>
    </>
  );
};

export default DeleteCoupon;
