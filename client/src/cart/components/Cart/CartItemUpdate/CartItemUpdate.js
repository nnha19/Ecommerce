import React from "react";

import "./CartItemUpdate.css";

const CartItemUpdate = (props) => {
  return (
    <div className="cart__item-update">
      <i class="far fa-heart cart__item-heart cart__item-icons"></i>
      <i class="fas fa-trash cart__item-delete cart__item-icons"></i>
    </div>
  );
};

export default CartItemUpdate;
