import React, { useState, useContext } from "react";

import "./CreateCoupon.css";

import axios from "axios";

import FormInput from "../../../share/components/FormInput/FormInput";
import SecondaryBtn from "../../../share/components/SecondaryBtn/SecondaryBtn";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import Context from "../../../contexts/context";
import Spinner from "../../../share/UI/Spinner/Spinner";

const CreateCoupon = (props) => {
  const context = useContext(Context);
  const [cleanInput, setCleanInput] = useState(false);
  const [couponVal, setCouponVal] = useState({
    couponCode: {
      value: "",
      error: true,
    },
    discountPrice: {
      value: "",
      error: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const allValid = useCheckOverAllValid(couponVal);

  const changeCouponValHandler = (e, error) => {
    const { value, name } = e.target;
    const updated = { ...couponVal[name], value, error };
    setCouponVal({ ...couponVal, [name]: updated });
  };

  const createCouponHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { couponCode, discountPrice } = couponVal;
      const result = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/coupon`,
        method: "post",
        data: {
          code: couponCode.value,
          discountPrice: discountPrice.value,
        },
        headers: {
          Authorization: context.token,
        },
      });
      setLoading(false);
      setCleanInput(true);
      setTimeout(() => {
        setCleanInput(false);
      }, 300);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  return (
    <>
      <Spinner show={loading} />
      <div className="checkout-container">
        <div className=" coupon-form-container">
          <form className="checkout__form coupon__form">
            <FormInput
              value={couponVal["couponCode"].value}
              validRules={{ required: true }}
              label="Coupon Code"
              type="text"
              name="couponCode"
              changeVal={changeCouponValHandler}
            />
            <FormInput
              value={couponVal["discountPrice"].value}
              validRules={{ required: true }}
              label="Discount Price"
              placeholder="Eg:12"
              type="number"
              name="discountPrice"
              changeVal={changeCouponValHandler}
            />
            <SecondaryBtn
              clicked={props.editCoupon || createCouponHandler}
              disabled={props.editing ? !props.allValid : !allValid[0]}
              className="coupon-form__btn"
            >
              Submit
            </SecondaryBtn>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCoupon;
