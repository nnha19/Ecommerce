import React, { useState, useEffect, useContext } from "react";

import Modal from "../../../../share/UI/Modal/Modal";
import "./CartItemUpdate.css";
import Button from "../../../../share/components/button/button";
import { useHttp } from "../../../../customHooks/useHttp";
import Spinner from "../../../../share/UI/Spinner/Spinner";
import context from "../../../../contexts/context";

const CartItemUpdate = (props) => {
  const updateCartItemAmount = useContext(context).updateCartItemAmount;
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
    fetchData(`http://localhost:5000/cart/${props.item._id}`, "delete");
    setTimeout(() => {
      updateCartItemAmount();
    }, 500);

    if (!error) {
      props.updateRespData(props.item);
    }
  };

  return (
    <>
      <Spinner show={loading} />
      <div className="cart__item-update">
        <i
          title="Add to whilist"
          className="far fa-heart cart__item-heart cart__item-icons"
        ></i>
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
      </div>
    </>
  );
};

export default CartItemUpdate;
