import React, { useState, useEffect, useContext } from "react";

import Cart from "../../components/Cart/Cart";
import Spinner from "../../../share/UI/Spinner/Spinner";
import Context from "../../../contexts/context";
import CartPageError from "../../components/CartPageError/CartPageError";

const CartPage = (props) => {
  const [cartItemError, setCartItemError] = useState(false);
  const context = useContext(Context);
  const cartItemData = context.cartItemData;
  document.title = context.curUser && `${context.curUser.username} (Cart)`;

  useEffect(() => {
    if (
      !cartItemData.cartItem ||
      cartItemData.cartItem.length === 0 ||
      !Array.isArray(cartItemData.cartItem)
    ) {
      setCartItemError("No items in the cart.");
    } else {
      setCartItemError(null);
    }
  }, [cartItemData.cartItem, context.curUser]);

  let content;
  if (!cartItemError) {
    content = <Cart />;
  } else {
    content = <CartPageError title="no items in the cart" />;
  }

  return (
    <>
      <Spinner show={cartItemData.loading} />
      {content}
    </>
  );
};

export default CartPage;
