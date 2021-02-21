import React from "react";

import Modal from "../../../../share/UI/Modal/Modal";
import Button from "../../../../share/components/button/button";
import { useHistory } from "react-router-dom";

const CheckoutModal = (props) => {
  const history = useHistory();

  const goToOrderPageHandler = () => {
    history.push(`/order/${props.curUser.userId}`);
  };

  const goToShoppingPageHandler = () => {
    history.push("/");
  };

  return (
    <Modal
      modalShow={!!props.placedOrder}
      title={props.placedOrder}
      body={
        <>
          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Orders can be cancelled within 15 minutes
          </p>
          <div style={{ textAlign: "center" }}>
            <Button
              clicked={goToOrderPageHandler}
              style={{ marginRight: "1rem" }}
            >
              My orders
            </Button>
            <Button clicked={goToShoppingPageHandler} style={{ width: "9rem" }}>
              Contunue Shopping
            </Button>
          </div>
        </>
      }
    />
  );
};

export default CheckoutModal;
