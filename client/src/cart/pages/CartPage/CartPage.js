import React, { useState, useEffect, useContext } from "react";

import Cart from "../../components/Cart/Cart";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import ErrorMsg from "./ErrorMsg/ErrorMsg";
import Context from "../../../contexts/context";

const CartPage = (props) => {
  const [cartItemError, setCartItemError] = useState(false);
  const context = useContext(Context);
  const cartItemData = context.cartItemData;

  useEffect(() => {
    console.log(cartItemData.cartItem);
    if (
      cartItemData.cartItem.length === 0 ||
      !Array.isArray(cartItemData.cartItem)
    ) {
      setCartItemError("No items in the cart.");
    }
  }, [cartItemData.cartItem]);

  console.log(cartItemError);

  let content;
  if (!cartItemError) {
    content = <Cart />;
  } else {
    content = (
      <ErrorMsg link={"/"} errorMsg={cartItemError} action="Go shopping" />
    );
  }

  return (
    <>
      <Spinner show={cartItemData.loading} />
      {content}
    </>
  );
};

export default CartPage;
