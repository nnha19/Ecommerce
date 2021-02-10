import React, { useEffect } from "react";

import Cart from "../../components/Cart/Cart";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";

const CartPage = (props) => {
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
  };

  const updateRespDataHandler = (data) => {
    const updatedRespData = respData.filter((d) => d._id !== data._id);
    setRespData(updatedRespData);
  };

  useEffect(() => {
    props.updateCartItemAmount(respData.length);
  }, [respData.length]);

  return (
    <>
      <Spinner show={loading} />
      <Cart
        updateRespData={(data) => updateRespDataHandler(data)}
        updateItemQuantity={(type, cartItem) =>
          updateQuantityHandler(type, cartItem)
        }
        cartItems={respData}
      />
    </>
  );
};

export default CartPage;
