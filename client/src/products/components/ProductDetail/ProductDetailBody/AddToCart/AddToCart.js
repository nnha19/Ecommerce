import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import Button from "../../../../../share/components/button/button";
import SecondaryBtn from "../../../../../share/components/SecondaryBtn/SecondaryBtn";
import AddToCartDisplayMsg from "../AddToCartDisplayMsg/AddToCartDisplayMsg";

const AddToCart = (props) => {
  const cartItemData = props.cartItemData;
  const history = useHistory();
  const [addedToCart, setAddedToCart] = useState(false);
  const [buying, setBuying] = useState(false);
  const product = props.product;

  useEffect(() => {
    cartItemData.error && setAddedToCart(false);
  });
  useEffect(() => {
    if (buying && !cartItemData.loading) {
      history.push("/checkout");
    }
  }, [buying, cartItemData.loading]);

  const addToCartHandler = () => {
    if (!props.context.authenticated) {
      props.context.toggleLogin();
      return;
    }

    const data = {
      brand: product.brand,
      price: product.price,
      productId: product._id,
      features: {
        gender: product.features.gender,
        inStock: product.features.inStock,
      },
      image: product.image,
      pickedQty: props.itemQuantity,
    };
    props.context.cartItemData.fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/cart/${props.context.curUser.userId}`,
      "post",
      data
    );
    setAddedToCart(true);
    if (props.buy) {
      setBuying(true);
      return;
    }
  };

  const hideModalHandler = () => {
    setAddedToCart(false);
  };

  return (
    <>
      {addedToCart && !cartItemData.loading && !cartItemData.error && (
        <AddToCartDisplayMsg
          hideModal={() => hideModalHandler()}
          name={product.brand}
          amount={props.itemQuantity}
          addedToCart={addedToCart}
        />
      )}
      {props.whilist ? (
        <i
          className={`fas fa-shopping-cart ${props.className}`}
          onClick={() => addToCartHandler()}
        >
          <span>+</span>
        </i>
      ) : (
        <SecondaryBtn
          clicked={() => addToCartHandler()}
          className={`product-detail__btn cart-btn ${props.className}`}
        >
          {props.children}
        </SecondaryBtn>
      )}
    </>
  );
};

export default AddToCart;
