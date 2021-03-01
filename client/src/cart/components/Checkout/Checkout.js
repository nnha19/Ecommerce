import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Checkout.css";

import OrderSummary from "../Cart/OrderSummary/OrderSummary";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import Context from "../../../contexts/context";
import Cart from "../Cart/Cart";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";
import CheckoutModal from "./CheckoutModal/CheckoutModal";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

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
      `${process.env.REACT_APP_BACKEND_URL}/order/${context.curUser.userId}`,
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
      <Spinner show={loading || context.cartItemData.loading} />
      <div className="checkout-container">
        <div className="checkout">
          <div className="checkout__delivery-infos">
            <h4>Delivery Information</h4>
            <CheckoutForm
              changeLoginVal={(val, label) => changeLoginValHandler(val, label)}
            />
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
