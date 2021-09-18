import React, { useContext, useEffect } from "react";

import "./ProductDetailBody.css";

import ATCErrorMsg from "./ATCErrorMsg/ATCErrorMsg";
import Context from "../../../../contexts/context";
import Spinner from "../../../../share/UI/Spinner/Spinner";

const ProductDetailBody = ({ product }) => {
  const { cartItemData } = useContext(Context);

  useEffect(() => {
    cartItemData.setError(false);
  }, []);

  return (
    <>
      <Spinner show={cartItemData.loading} />
      {cartItemData.error && (
        <ATCErrorMsg
          // hideModal={() => hideModalHandler()}
          error={cartItemData.error}
          setError={cartItemData.setError}
        />
      )}
      <div className="product-detail__body">
        <p>{product.description}</p>
      </div>
    </>
  );
};

export default ProductDetailBody;
