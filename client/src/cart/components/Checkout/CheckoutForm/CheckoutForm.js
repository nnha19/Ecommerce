import React from "react";

import FormInput from "../../../../share/components/FormInput/FormInput";

const CheckoutForm = (props) => {
  return (
    <form className="checkout__form">
      <div className="person-infos">
        <FormInput
          id="name"
          validRules={{ type: "REQUIRE" }}
          errorMsg="This field can't be empty"
          inputCls="checkout__input"
          changeLoginVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="Name"
          type="text"
          labelCls="checkout__label"
          containerCls="checkout-input-container"
        />
        <FormInput
          id="phNumber"
          validRules={{ type: "REQUIRE" }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeLoginVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="Ph Number"
          type="number"
          labelCls="checkout__label"
        />
      </div>
      <div className="address">
        <FormInput
          id="region"
          validRules={{ type: "REQUIRE" }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeLoginVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="Region"
          type="text"
          labelCls="checkout__label"
        />
        <FormInput
          id="city"
          validRules={{ type: "REQUIRE" }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeLoginVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="City"
          type="text"
          labelCls="checkout__label"
        />
        <FormInput
          id="houseNumber"
          validRules={{ type: "REQUIRE" }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeLoginVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="House Number"
          type="text"
          labelCls="checkout__label"
        />
        <FormInput
          id="message"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeLoginVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="textarea"
          label="Message(Optional)"
          type="text"
          labelCls="checkout__label"
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
