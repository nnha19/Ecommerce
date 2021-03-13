import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./ProductDetailBody.css";
import Button from "../../../../share/components/button/button";
import ProductQuantity from "../ProductDetailBody/ProductQuantity/ProductQuantity";
import AddToCartDisplayMsg from "./AddToCartDisplayMsg/AddToCartDisplayMsg";
import ATCErrorMsg from "./ATCErrorMsg/ATCErrorMsg";
import Context from "../../../../contexts/context";
import AddToWhilist from "../../../../cart/components/Cart/AddToWhilist/AddToWhilist";

const ProductDetailBody = (props) => {
  const history = useHistory();
  const context = useContext(Context);
  const error = context.cartItemData;
  const product = props.product;

  const [itemQuantity, setItemQuantity] = useState(product.pickedQty);
  const [addedToCart, setAddedToCart] = useState(false);

  const updateQuantityHandler = (type) => {
    type === "add"
      ? setItemQuantity((prev) => prev + 1)
      : setItemQuantity((prev) => prev - 1);
  };

  const addToCartHandler = (type) => {
    if (!context.authenticated) {
      context.toggleLogin();
      return;
    }
    let chosenColor;
    product.colors.forEach((c) => {
      if (c.choosen) {
        chosenColor = c.color;
      }
    });

    const data = {
      brand: product.brand,
      price: product.price,
      productId: product._id,
      features: {
        gender: product.features.gender,
        inStock: product.features.inStock,
      },
      color: chosenColor,
      image: product.image,
      pickedQty: itemQuantity,
    };
    context.cartItemData.fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/cart/${context.curUser.userId}`,
      "post",
      data
    );
    if (type === "buy") {
      error.error = null;
      setTimeout(() => {
        error.setError(false);
        history.push("/checkout");
      }, 500);
      return;
    }
    setTimeout(() => {
      !error.error && setAddedToCart(true);
    }, 1500);
  };

  const hideModalHandler = () => {
    setAddedToCart(false);
    context.cartItemData.setError(false);
  };

  return (
    <>
      {addedToCart && (
        <AddToCartDisplayMsg
          hideModal={() => hideModalHandler()}
          name={product.brand}
          amount={itemQuantity}
          addedToCart={addedToCart}
          error={error}
        />
      )}
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
            <Button
              clicked={() => addToCartHandler()}
              className="product-detail__btn cart-btn"
            >
              Add To Cart
            </Button>
            <Button
              clicked={() => addToCartHandler("buy")}
              className="product-detail__btn checkout-btn"
            >
              Buy Now
            </Button>
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
