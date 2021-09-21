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
      isValid: false,
      isTouched: false,
    },
    discountPrice: {
      value: "",
      isValid: "false",
      isTouched: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const allValid = useCheckOverAllValid(couponVal);

  const changeCouponValHandler = (inputVal, id) => {
    let updated = couponVal[id];
    updated = inputVal;
    setCouponVal({ ...couponVal, [id]: updated });
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
        <div className="checkout__delivery-infos coupon-form-container">
          <form className="checkout__form coupon__form">
            <FormInput
              value={props.couponCode}
              validRules={{ type: "REQUIRE" }}
              elementType="input"
              label="Coupon Code"
              type="text"
              changeLoginVal={(inputVal, id) =>
                props.editing
                  ? props.changeCouponVal(inputVal, id)
                  : changeCouponValHandler(inputVal, id)
              }
              inputCls="checkout__input"
              labelCls="checkout__label"
              errorMsg="This field is required"
              id="couponCode"
              cleanInput={cleanInput}
            />
            <FormInput
              value={props.discountPrice}
              validRules={{ type: "REQUIRE" }}
              elementType="input"
              label="Discount Price"
              type="number"
              changeLoginVal={(inputVal, id) =>
                props.editing
                  ? props.changeCouponVal(inputVal, id)
                  : changeCouponValHandler(inputVal, id)
              }
              inputCls="checkout__input"
              labelCls="checkout__label"
              errorMsg="This field is required"
              id="discountPrice"
              cleanInput={cleanInput}
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
