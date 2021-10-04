import React from "react";

import "./CartPageError.css";

import CartItemErrorImg from "../../../assets/img.jpg";
import { useHistory } from "react-router";

const CartPageError = ({ title }) => {
  const history = useHistory();
  return (
    <div className="cart-page-error">
      <img className="cart-page-error__img" src={CartItemErrorImg} />
      <div className="cart-page-error__content">
        <p>{title}</p>
        <button onClick={() => history.push("/products")}>Go Shopping</button>
      </div>
    </div>
  );
};
export default CartPageError;
