import React, { useEffect, useContext } from "react";

import Cart from "../../components/Cart/Cart";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import ErrorMsg from "./ErrorMsg/ErrorMsg";
import Context from "../../../contexts/context";

const CartPage = (props) => {
  const context = useContext(Context);
  const cartItemData = context.cartItemData;

  // const updateQuantityHandler = (type, cartItem) => {
  //   const data = {
  //     type,
  //   };
  //   if (
  //     (type === "add" && cartItem.features.inStock > cartItem.pickedQty) ||
  //     (type === "subtract" && cartItem.pickedQty > 1)
  //   ) {
  //     context.cartItemData.fetchData(
  //       `http://localhost:5000/cart/update-cart-item/${cartItem._id}/${context.curUser.userId}`,
  //       "put",
  //       data
  //     );
  //   }
  //   context.updateCartItemAmount();
  // };

  let content;
  if (!cartItemData.error) {
    content = (
      <Cart
      // updateItemQuantity={(type, cartItem) =>
      //   updateQuantityHandler(type, cartItem)
      // }
      />
    );
  } else {
    content = (
      <ErrorMsg link={"/"} errorMsg={cartItemData.error} action="Go shopping" />
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
