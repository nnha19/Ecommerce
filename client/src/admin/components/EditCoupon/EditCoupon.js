import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import CreateCoupon from "../CreateCoupon/CreateCoupon";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import axios from "axios";

const UpdateCoupon = (props) => {
  const couponId = useParams().couponId;
  const [editProductVal, setEditProductVal] = useState({
    couponCode: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    discountPrice: {
      value: "",
      isValid: false,
      isTouched: false,
    },
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/coupon/${couponId}`);
  }, []);

  const allValid = useCheckOverAllValid(editProductVal);

  const editingCouponValHandler = (inputVal, id) => {
    console.log(inputVal);
    console.log(id);
  };

  const editCouponHandler = (e) => {
    e.preventDefault();
    console.log("editing");
  };

  return (
    <>
      <h4>Edit Coupon</h4>
      <CreateCoupon
        editCoupon={editCouponHandler}
        changeCouponVal={(inputVal, id) =>
          editingCouponValHandler(inputVal, id)
        }
        couponCode="s"
        discountPrice={1200}
        allValid={allValid}
      />
    </>
  );
};

export default UpdateCoupon;
