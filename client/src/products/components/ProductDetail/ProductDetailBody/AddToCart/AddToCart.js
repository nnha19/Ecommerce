import React, { useState, useEffect, useContext } from "react";

import Context from "../../../../../contexts/context";
import SecondaryBtn from "../../../../../share/components/SecondaryBtn/SecondaryBtn";
import PopUpMsg from "../../../../../share/UI/PopUpMsg/PopUpMsg";

const AddToCart = ({ className, product, whilist, children }) => {
  const { cartItemData, authenticated, curUser, toggleLogin } =
    useContext(Context);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    cartItemData.error && setAddedToCart(false);
  });

  const addToCartHandler = () => {
    if (!authenticated) {
      toggleLogin();
      return;
    }
    const data = {
      productId: product._id,
    };
    cartItemData.fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/cart/${curUser.userId}`,
      "post",
      data
    );
    setAddedToCart(true);
  };

  useEffect(() => {
    setTimeout(() => {
      addedToCart && setAddedToCart(false);
    }, 5000);
  }, [addedToCart]);

  return (
    <>
      {addedToCart && !cartItemData.loading && !cartItemData.error && (
        <PopUpMsg>{product.brand} added to cart</PopUpMsg>
      )}

      {whilist ? (
        <i
          className={`fas fa-shopping-cart ${className}`}
          onClick={() => addToCartHandler()}
        >
          <span>+</span>
        </i>
      ) : (
        <SecondaryBtn
          clicked={() => addToCartHandler()}
          className={`product-detail__btn cart-btn ${className}`}
        >
          {children}
        </SecondaryBtn>
      )}
    </>
  );
};

export default AddToCart;
