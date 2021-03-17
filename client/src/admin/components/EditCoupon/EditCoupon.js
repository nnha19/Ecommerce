import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import CreateCoupon from "../CreateCoupon/CreateCoupon";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import axios from "axios";
import Context from "../../../contexts/context";

const UpdateCoupon = (props) => {
  const context = useContext(Context);
  const couponId = useParams().couponId;

  const [editCouponVal, setEditCouponVal] = useState("");

  const [couponVal, setCouponVal] = useState({});

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/coupon/${couponId}`,
        method: "get",
        headers: {
          Authorization: context.token,
        },
      });
      const coupon = res.data;
      setEditCouponVal(coupon);
    })();
  }, []);

  let allValid = useCheckOverAllValid(couponVal);

  const editingCouponValHandler = (inputVal, id) => {
    setCouponVal({
      ...couponVal,
      [id]: inputVal,
    });
  };

  const editCouponHandler = (e) => {
    e.preventDefault();
    console.log("editing");
  };

  return (
    <>
      <h4>Edit Coupon</h4>
      {editCouponVal && (
        <CreateCoupon
          editing={true}
          couponCode={editCouponVal.code}
          discountPrice={editCouponVal.discountPrice}
          editCoupon={editCouponHandler}
          changeCouponVal={(inputVal, id) =>
            editingCouponValHandler(inputVal, id)
          }
          allValid={allValid[0]}
        />
      )}
    </>
  );
};

export default UpdateCoupon;
