import React, { useState } from "react";

import "./CreateCoupon.css";

import FormInput from "../../../share/components/FormInput/FormInput";
import SecondaryBtn from "../../../share/components/SecondaryBtn/SecondaryBtn";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";

const CreateCoupon = (props) => {
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

  const allValid = useCheckOverAllValid(couponVal);

  const changeCouponValHandler = (inputVal, id) => {
    let updated = couponVal[id];
    updated = inputVal;
    setCouponVal({ ...couponVal, [id]: updated });
  };

  return (
    <div className="checkout-container">
      <div className="checkout__delivery-infos coupon-form-container">
        <form className="checkout__form coupon__form">
          <FormInput
            validRules={{ type: "REQUIRE" }}
            elementType="input"
            label="Coupon Code"
            type="text"
            changeLoginVal={(inputVal, id) =>
              changeCouponValHandler(inputVal, id)
            }
            inputCls="checkout__input"
            labelCls="checkout__label"
            errorMsg="This field is required"
            id="couponCode"
          />
          <FormInput
            validRules={{ type: "REQUIRE" }}
            elementType="input"
            label="Discount Price"
            type="text"
            changeLoginVal={(inputVal, id) =>
              changeCouponValHandler(inputVal, id)
            }
            inputCls="checkout__input"
            labelCls="checkout__label"
            errorMsg="This field is required"
            id="discountPrice"
          />
          <SecondaryBtn disabled={!allValid[0]} className="coupon-form__btn">
            Submit
          </SecondaryBtn>
        </form>
      </div>
    </div>
  );
};

export default CreateCoupon;
