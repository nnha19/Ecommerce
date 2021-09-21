import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";

import Context from "../../../../../contexts/context";
import SecondaryBtn from "../../../../../share/components/SecondaryBtn/SecondaryBtn";
import AddToCartDisplayMsg from "../AddToCartDisplayMsg/AddToCartDisplayMsg";
import ATCErrorMsg from "../ATCErrorMsg/ATCErrorMsg";

const AddToCart = ({
  itemQuantity,
  className,
  product,
  buy,
  whilist,
  children,
}) => {
  const { cartItemData, authenticated, curUser, toggleLogin } =
    useContext(Context);
  const history = useHistory();
  const [addedToCart, setAddedToCart] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    cartItemData.error && setAddedToCart(false);
  });
  useEffect(() => {
    if (buying && !cartItemData.loading) {
      history.push("/checkout");
    }
  }, [buying, cartItemData.loading]);

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
    if (buy) {
      setBuying(true);
      return;
    }
  };

  const hideModalHandler = () => {
    console.log("Hide");
    setAddedToCart(false);
    cartItemData.setError(false);
  };

  return (
    <>
      {cartItemData.error && (
        <ATCErrorMsg
          hideModal={() => hideModalHandler()}
          error={cartItemData.error}
          setError={cartItemData.setError}
        />
      )}
      {addedToCart && !cartItemData.loading && !cartItemData.error && (
        <AddToCartDisplayMsg
          hideModal={() => hideModalHandler()}
          name={product.brand}
          amount={itemQuantity}
          addedToCart={addedToCart}
        />
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
