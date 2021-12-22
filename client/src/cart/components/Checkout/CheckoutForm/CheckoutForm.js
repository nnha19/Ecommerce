import React from "react";

import FormInput from "../../../../share/components/FormInput/FormInput";

const CheckoutForm = (props) => {
  return (
    <form className="checkout__form">
      <div className="person-infos">
        <FormInput
          name="name"
          validRules={{ required: true }}
          errorMsg="This field can't be empty"
          inputCls="checkout__input"
          changeVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="Name"
          type="text"
          labelCls="checkout__label"
          containerCls="checkout-input-container"
        />
        <FormInput
          name="phNumber"
          validRules={{ required: true }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="Ph Number"
          type="number"
          labelCls="checkout__label"
        />
      </div>
      <div className="address">
        <FormInput
          name="region"
          validRules={{ required: true }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="Region"
          type="text"
          labelCls="checkout__label"
        />
        <FormInput
          name="city"
          validRules={{ required: true }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="City"
          type="text"
          labelCls="checkout__label"
        />
        <FormInput
          name="houseNumber"
          validRules={{ required: true }}
          errorMsg="This field can't be empty"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeVal={(val, label) => props.changeLoginVal(val, label)}
          elementType="input"
          label="House Number"
          type="text"
          labelCls="checkout__label"
        />
        <FormInput
          name="message"
          containerCls="checkout-input-container"
          inputCls="checkout__input"
          changeVal={(val, label) => props.changeLoginVal(val, label)}
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
