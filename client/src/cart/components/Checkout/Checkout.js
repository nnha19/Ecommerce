import React, { useState, useEffect } from "react";

import "./Checkout.css";

import OrderSummary from "../Cart/OrderSummary/OrderSummary";
import FormInput from "../../../share/components/FormInput/FormInput";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";

const Checkout = (props) => {
  const [orderInfos, setOrderInfos] = useState({
    name: {
      val: "",
      valid: false,
      isTouched: false,
    },
    phNumber: {
      val: "",
      valid: false,
      isTouched: false,
    },
    region: {
      val: "",
      valid: false,
      isTouched: false,
    },
    city: {
      val: "",
      valid: false,
      isTouched: false,
    },
    houseNumber: {
      val: "",
      valid: false,
      isTouched: false,
    },
    message: {
      val: "",
      valid: true,
      isTouched: false,
    },
  });
  const [allValid] = useCheckOverAllValid(orderInfos);

  const changeLoginValHandler = (val, label) => {
    const updateOrderInfos = { ...orderInfos, [label]: val };
    setOrderInfos(updateOrderInfos);
  };

  console.log(orderInfos);

  return (
    <div className="checkout-container">
      <div className="checkout">
        <div className="checkout__delivery-infos">
          <h4>Delivery Information</h4>
          <form className="checkout__form">
            <div className="person-infos">
              <FormInput
                id="name"
                validRules={{ type: "REQUIRE" }}
                errorMsg="This field can't be empty"
                inputCls="checkout__input"
                changeLoginVal={(val, label) =>
                  changeLoginValHandler(val, label)
                }
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
                changeLoginVal={(val, label) =>
                  changeLoginValHandler(val, label)
                }
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
                changeLoginVal={(val, label) =>
                  changeLoginValHandler(val, label)
                }
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
                changeLoginVal={(val, label) =>
                  changeLoginValHandler(val, label)
                }
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
                changeLoginVal={(val, label) =>
                  changeLoginValHandler(val, label)
                }
                elementType="input"
                label="House Number"
                type="text"
                labelCls="checkout__label"
              />
              <FormInput
                id="message"
                containerCls="checkout-input-container"
                inputCls="checkout__input"
                changeLoginVal={(val, label) =>
                  changeLoginValHandler(val, label)
                }
                elementType="textarea"
                label="Message(Optional)"
                type="text"
                labelCls="checkout__label"
              />
            </div>
          </form>
        </div>
        <div className="order-summary">
          <OrderSummary
            disabled={!allValid}
            checkout={true}
            action="place order"
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
