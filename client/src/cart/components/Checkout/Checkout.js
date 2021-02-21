import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Checkout.css";

import OrderSummary from "../Cart/OrderSummary/OrderSummary";
import FormInput from "../../../share/components/FormInput/FormInput";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import Context from "../../../contexts/context";
import Cart from "../Cart/Cart";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";
import CheckoutModal from "./CheckoutModal/CheckoutModal";

const Checkout = (props) => {
  const [newOrder, loading, error, fetchData, setNewOrder] = useHttp();
  const [placedOrder, setPlacedOrder] = useState(false);

  const history = useHistory();
  const context = useContext(Context);

  const { cartItem } = context.cartItemData;

  useEffect(() => {
    if (
      (!cartItem || cartItem.length === 0 || !Array.isArray(cartItem)) &&
      !placedOrder
    ) {
      history.push("/");
    }
  }, [cartItem]);

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

  const placeOrderHandler = () => {
    const order = {
      customerInfos: {},
    };
    for (let key in orderInfos) {
      order.customerInfos[key] = orderInfos[key].value;
    }
    fetchData(
      `http://localhost:5000/order/${context.curUser.userId}`,
      "post",
      order
    );
  };

  useEffect(() => {
    newOrder && context.cartItemData.setCartItem();
    newOrder && setPlacedOrder(newOrder.message);
  }, [newOrder]);

  return (
    <>
      <CheckoutModal curUser={context.curUser} placedOrder={placedOrder} />
      <Spinner show={loading} />
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
              clicked={() => placeOrderHandler()}
            />
          </div>
        </div>
        <Cart className="checkout__item-summary" checkout={true} />
      </div>
    </>
  );
};

export default Checkout;
