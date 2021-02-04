import React, { useEffect } from "react";

import Cart from "../../components/Cart/Cart";
import { useHttp } from "../../../customHooks/useHttp";

const CartPage = (props) => {
  const [respData, loading, error, fetchData, setRespData] = useHttp([]);

  useEffect(() => {
    fetchData(`http://localhost:5000/cart`, "get");
  }, []);
  useEffect(() => {
    props.updateCartItemAmount(respData.length);
  }, [respData.length]);
  return (
    <>
      <Cart cartItems={respData} />
    </>
  );
};

export default CartPage;
