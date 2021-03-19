import React, { useState, useEffect, useContext } from "react";

import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import CreateCoupon from "../CreateCoupon/CreateCoupon";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import Context from "../../../contexts/context";
import Spinner from "../../../share/UI/Spinner/Spinner";

const UpdateCoupon = (props) => {
  const history = useHistory();
  const context = useContext(Context);
  const couponId = useParams().couponId;

  const [editCouponVal, setEditCouponVal] = useState("");
  const [loading, setLoading] = useState(false);

  const [couponVal, setCouponVal] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/coupon/${couponId}`,
        method: "get",
        headers: {
          Authorization: context.token,
        },
      });
      const coupon = res.data;
      setEditCouponVal(coupon);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCouponVal({
        couponCode: {
          value: editCouponVal.code,
          valid: true,
          isTouched: true,
        },
        discountPrice: {
          value: editCouponVal.discountPrice,
          valid: true,
          isTouched: true,
        },
      });
    }, 500);
  }, [editCouponVal]);

  let allValid = useCheckOverAllValid(couponVal);

  const editingCouponValHandler = (inputVal, id) => {
    setCouponVal({
      ...couponVal,
      [id]: inputVal,
    });
  };

  const editCouponHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        code: couponVal.couponCode.value,
        discountPrice: couponVal.discountPrice.value,
      };
      await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/coupon/${editCouponVal._id}`,
        method: "put",
        headers: {
          Authorization: context.token,
        },
        data,
      });
      history.push(`/admin/coupon`);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  return (
    <>
      <Spinner show={loading} />
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
