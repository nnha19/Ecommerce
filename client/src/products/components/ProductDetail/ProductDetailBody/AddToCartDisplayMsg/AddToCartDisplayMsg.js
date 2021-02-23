import React from "react";
import { useHistory } from "react-router-dom";

import Modal from "../../../../../share/UI/Modal/Modal";
import Button from "../../../../../share/components/button/button";

const AddToCartDisplayMsg = (props) => {
  const history = useHistory();
  const continueShoppingHandler = () => {
    history.push("/");
  };

  const goToCheckoutHandler = () => {
    history.push("/checkout");
  };

  return (
    !props.error.error && (
      <Modal
        hideModal={props.hideModal}
        title={`${props.amount} ${props.name} added to cart`}
        modalShow={props.addedToCart}
        body={
          <>
            <Button
              clicked={goToCheckoutHandler}
              style={{ marginRight: "1rem" }}
            >
              Checkout
            </Button>
            <Button clicked={continueShoppingHandler}>Continue Shopping</Button>
          </>
        }
      />
    )
  );
};

export default AddToCartDisplayMsg;
