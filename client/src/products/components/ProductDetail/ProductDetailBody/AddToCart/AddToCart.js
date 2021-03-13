import React from "react";

import { useHistory } from "react-router-dom";

import Button from "../../../../../share/components/button/button";

const AddToCart = (props) => {
  const history = useHistory();

  const product = props.product;
  const error = props.error;
  const addToCartHandler = (type) => {
    if (!props.context.authenticated) {
      props.context.toggleLogin();
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
      pickedQty: props.itemQuantity,
    };
    props.context.cartItemData.fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/cart/${props.context.curUser.userId}`,
      "post",
      data
    );
    if (props.buy) {
      error.error = null;
      setTimeout(() => {
        error.setError(false);
        history.push("/checkout");
      }, 500);
      return;
    }
    setTimeout(() => {
      !error.error && props.setAddedToCart(true);
    }, 1500);
  };

  return (
    <Button
      clicked={() => addToCartHandler()}
      className={`product-detail__btn cart-btn ${props.className}`}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCart;
