import React, { useContext } from "react";

import WhilistProduct from "../components/WhilistProduct/WhilistProduct";
import Context from "../../contexts/context";
import ATCErrorMsg from "../../products/components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";
import CartPageError from "../../cart/components/CartPageError/CartPageError";

const WhilistProductPage = (props) => {
  const { whilist } = useContext(Context);

  return (
    <>
      <ATCErrorMsg />
      {whilist && whilist.length > 0 ? (
        <WhilistProduct whilistProduct={whilist} />
      ) : (
        <CartPageError title="no whilisted products" />
      )}
    </>
  );
};

export default WhilistProductPage;
