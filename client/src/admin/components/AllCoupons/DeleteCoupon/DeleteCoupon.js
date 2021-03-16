import React, { useState, useContext } from "react";

import axios from "axios";

import "./DeleteCoupon.css";

import Modal from "../../../../share/UI/Modal/Modal";
import Button from "../../../../share/components/button/button";
import Context from "../../../../contexts/context";
import Spinner from "../../../../share/UI/Spinner/Spinner";

const DeleteCoupon = (props) => {
  const context = useContext(Context);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteCouponIsLoading, setDeleteCouponIsLoading] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowDeleteWarning(true);
  };

  const cancelDeleteCouponHandler = () => {
    setShowDeleteWarning(false);
  };

  const deleteCouponHandler = async () => {
    try {
      setShowDeleteWarning(false);
      setDeleteCouponIsLoading(true);
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/coupon/${props.couponId}`,
        method: "delete",
        headers: {
          Authorization: context.token,
        },
      });
      props.deleteOneCoupon(props.couponId);
      setDeleteCouponIsLoading(false);
    } catch (err) {
      console.log(err.response);
      setDeleteCouponIsLoading(false);
    }
  };

  return (
    <>
      <Spinner show={deleteCouponIsLoading} />
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
