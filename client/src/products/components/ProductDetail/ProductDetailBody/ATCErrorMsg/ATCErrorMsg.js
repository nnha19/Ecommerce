import React from "react";

import { useHistory } from "react-router-dom";

import Modal from "../../../../../share/UI/Modal/Modal";
import Button from "../../../../../share/components/button/button";

const ATCErrorMsg = (props) => {
  const history = useHistory();
  const continueShoppingHandler = () => {
    history.push("/");
    props.setError(false);
  };
  return (
    <Modal
      hideModal={() => props.hideModal()}
      body={
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ padding: ".4rem", width: "10rem", marginRight: "1rem" }}
            clicked={continueShoppingHandler}
          >
            Continue Shopping
          </Button>
          <Button>Checkout</Button>
        </div>
      }
      modalShow={props.error}
      title={props.error}
    />
  );
};

export default ATCErrorMsg;
