import React, { useState, useContext, useEffect } from "react";

import "./ProductDetailBody.css";
import Button from "../../../../share/components/button/button";
import ProductQuantity from "../ProductDetailBody/ProductQuantity/ProductQuantity";
import ATCErrorMsg from "./ATCErrorMsg/ATCErrorMsg";
import Context from "../../../../contexts/context";
import AddToWhilist from "../../../../cart/components/Cart/AddToWhilist/AddToWhilist";
import AddToCart from "./AddToCart/AddToCart";

const ProductDetailBody = (props) => {
  const context = useContext(Context);
  const error = context.cartItemData;
  const product = props.product;

  const [itemQuantity, setItemQuantity] = useState(product.pickedQty);

  const updateQuantityHandler = (type) => {
    type === "add"
      ? setItemQuantity((prev) => prev + 1)
      : setItemQuantity((prev) => prev - 1);
  };

  const hideModalHandler = () => {
    context.cartItemData.setError(false);
  };

  return (
    <>
      {error && (
        <ATCErrorMsg
          hideModal={() => hideModalHandler()}
          error={error.error}
          setError={error.setError}
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
          <ProductQuantity
            type="body"
            itemQuantity={itemQuantity}
            updateItemQuantity={(type) => updateQuantityHandler(type)}
            product={product}
          />
          <div className="btns">
            <AddToCart
              itemQuantity={itemQuantity}
              context={context}
              product={product}
              error={error}
              hideModal={() => hideModalHandler()}
            />
            <AddToCart
              buy={true}
              className="product-detail__btn checkout-btn"
              itemQuantity={itemQuantity}
              context={context}
              product={product}
              error={error}
              hideModal={() => hideModalHandler()}
            />
          </div>
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
