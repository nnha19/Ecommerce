import React, { useContext, useEffect } from "react";

import "./ProductDetailBody.css";
import Button from "../../../../share/components/button/button";
import ATCErrorMsg from "./ATCErrorMsg/ATCErrorMsg";
import Context from "../../../../contexts/context";
import AddToWhilist from "../../../../cart/components/Cart/AddToWhilist/AddToWhilist";
import Spinner from "../../../../share/UI/Spinner/Spinner";

const ProductDetailBody = (props) => {
  const context = useContext(Context);
  const cartItemData = context.cartItemData;

  const product = props.product;

  useEffect(() => {
    cartItemData.setError(false);
  }, []);

  const hideModalHandler = () => {
    cartItemData.setError(false);
  };

  return (
    <>
      <Spinner show={cartItemData.loading} />
      {cartItemData.error && (
        <ATCErrorMsg
          hideModal={() => hideModalHandler()}
          error={cartItemData.error}
          setError={cartItemData.setError}
        />
      )}
      <div className="product-detail__body">
        <div className="product-detail__brand">
          <h4>{product.brand}</h4>
          <AddToWhilist
            addedToWhilist={props.addedToWhilist}
            productId={product._id}
            userId={context.curUser && context.curUser.userId}
          />
        </div>
        <p className="product-detail__price">{product.price} KS</p>
        <p>{product.description}</p>
        <div className="product-detail__cart">
          <div className="features-btn-container">
            <Button clicked={props.showFeatures} className="features-btn">
              Features
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailBody;
