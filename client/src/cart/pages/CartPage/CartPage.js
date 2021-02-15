import React, { useEffect, useContext } from "react";

import Cart from "../../components/Cart/Cart";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import ErrorMsg from "./ErrorMsg/ErrorMsg";
import context from "../../../contexts/context";

const CartPage = (props) => {
  const updateCartItemAmount = useContext(context).updateCartItemAmount;
  console.log("Cart page gets rednered");
  const [respData, loading, error, fetchData, setRespData] = useHttp([]);

  useEffect(() => {
    fetchData(`http://localhost:5000/cart`, "get");
  }, []);

  const updateQuantityHandler = (type, cartItem) => {
    const data = {
      type,
    };
    if (
      (type === "add" && cartItem.features.inStock > cartItem.pickedQty) ||
      (type === "subtract" && cartItem.pickedQty > 1)
    ) {
      fetchData(
        `http://localhost:5000/cart/update-cart-item/${cartItem._id}`,
        "put",
        data
      );
    }
    setTimeout(() => {
      updateCartItemAmount();
    }, 500);
  };

  const updateRespDataHandler = (data) => {
    const updatedRespData = respData.filter((d) => d._id !== data._id);
    setRespData(updatedRespData);
  };

  let content;

  if (!error) {
    content = (
      <Cart
        updateRespData={(data) => updateRespDataHandler(data)}
        updateItemQuantity={(type, cartItem) =>
          updateQuantityHandler(type, cartItem)
        }
        cartItems={respData}
      />
    );
  } else {
    content = <ErrorMsg link={"/"} errorMsg={error} action="Go shopping" />;
  }

  return (
    <>
      <Spinner show={loading} />
      {content}
    </>
  );
};

export default CartPage;
