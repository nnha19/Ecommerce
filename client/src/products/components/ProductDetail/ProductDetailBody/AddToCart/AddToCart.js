import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";

import Context from "../../../../../contexts/context";
import SecondaryBtn from "../../../../../share/components/SecondaryBtn/SecondaryBtn";
import AddToCartDisplayMsg from "../AddToCartDisplayMsg/AddToCartDisplayMsg";

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
      brand: product.brand,
      price: product.price,
      productId: product._id,
      features: {
        gender: product.features.gender,
        inStock: product.features.inStock,
      },
      image: product.image,
      pickedQty: itemQuantity,
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
    setAddedToCart(false);
  };

  return (
    <>
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
