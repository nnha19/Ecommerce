import React, { useState, useEffect, useContext } from "react";

import Modal from "../../../../share/UI/Modal/Modal";
import "./RemoveItemFromCart.css";
import Button from "../../../../share/components/button/button";
import { useHttp } from "../../../../customHooks/useHttp";
import Spinner from "../../../../share/UI/Spinner/Spinner";
import Context from "../../../../contexts/context";

const RemoveItemFromCart = (props) => {
  const context = useContext(Context);
  const [cartItems, loading, error, fetchData, setCartItems] = useHttp();
  const [showDeleteWarning, setDeleteWarning] = useState(false);

  const deleteWarningHandler = () => {
    setDeleteWarning(true);
  };

  const deleteWarningCancelHandler = () => {
    setDeleteWarning(false);
  };

  const cartItemRemoveHandler = () => {
    setDeleteWarning(false);
    context.cartItemData.fetchData(
      `http://localhost:5000/cart/${props.item._id}/${context.curUser.userId}`,
      "delete"
    );
    console.log(error);
    // if (!error) {
    //   context.cartItemData.setCartItem(props.item);
    // props.updateRespData(props.item);
    // }
  };

  return (
    <>
      <Spinner show={loading} />

      <>
        <Modal
          modalShow={showDeleteWarning}
          title="Are you sure you want to remove this item?"
          body={
            <>
              <Button
                clicked={cartItemRemoveHandler}
                className="cart__item-remove"
              >
                Sure
              </Button>
              <Button
                clicked={deleteWarningCancelHandler}
                className="cart__item-cancel"
              >
                Cancel
              </Button>
            </>
          }
        />
        <i
          title="Remove from cart"
          onClick={deleteWarningHandler}
          className="fas fa-trash cart__item-delete cart__item-icons"
        ></i>
      </>
    </>
  );
};

export default RemoveItemFromCart;
