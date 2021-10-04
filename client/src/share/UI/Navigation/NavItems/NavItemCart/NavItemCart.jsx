import React, { useContext } from "react";
import { useHistory } from "react-router";

import Context from "../../../../../contexts/context";

const NavItemCart = () => {
  const history = useHistory();
  const goToCartHandler = () => {
    if (context.authenticated) {
      context.authenticated && history.push("/cart");
    } else {
      context.toggleLogin();
    }
  };

  const context = useContext(Context);
  return (
    <i onClick={goToCartHandler} className="shopping-cart fas fa-shopping-cart">
      {context.cartItemAmount ? (
        <span className="shopping-cart__item-qty">
          {context.cartItemAmount}
        </span>
      ) : null}
    </i>
  );
};

export default NavItemCart;
