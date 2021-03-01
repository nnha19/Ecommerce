import React, { useState, useEffect, useContext } from "react";

import "./RemoveItemFromCart.css";

import { useHttp } from "../../../../customHooks/useHttp";
import Spinner from "../../../../share/UI/Spinner/Spinner";
import Context from "../../../../contexts/context";
import DeleteWarning from "./DeleteWarning/DeleteWarning";

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
      `${process.env.REACT_APP_BACKEND_URL}/cart/${props.item._id}/${context.curUser.userId}`,
      "delete"
    );
  };

  return (
    <>
      <Spinner show={loading} />
      <>
        <DeleteWarning
          cartItemRemove={cartItemRemoveHandler}
          deleteWarningCancel={deleteWarningCancelHandler}
          showDeleteWarning={showDeleteWarning}
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
