import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

import Modal from "../../../../../share/UI/Modal/Modal";
import Button from "../../../../../share/components/button/button";
import Context from "../../../../../contexts/context";

const ATCErrorMsg = (props) => {
  const { cartItemData } = useContext(Context);
  const history = useHistory();
  const continueShoppingHandler = () => {
    history.push("/");
    props.setError(false);
  };
  return (
    <Modal
      hideModal={() => cartItemData.setError(null)}
      body={
        <div style={{ textAlign: "center" }}>
          <Button
            className="cart__item-remove"
            style={{ padding: ".4rem", width: "10rem", marginRight: "1rem" }}
            clicked={continueShoppingHandler}
          >
            Continue Shopping
          </Button>
          <Button
            className="cart__item-cancel"
            clicked={() => history.push(`/checkout`)}
          >
            Checkout
          </Button>
        </div>
      }
      modalShow={cartItemData.error}
      title={cartItemData.error}
    />
  );
};

export default ATCErrorMsg;
