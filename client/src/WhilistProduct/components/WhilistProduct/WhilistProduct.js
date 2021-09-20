import React, { useContext, useState } from "react";

import "./WhilistProduct.css";

import { useHistory } from "react-router-dom";
import axios from "axios";

import RemoveWhilistProduct from "./RemoveWhilistProduct/RemoveWhilistProduct";
import AddToCart from "../../../products/components/ProductDetail/ProductDetailBody/AddToCart/AddToCart";
import Context from "../../../contexts/context";
import Spinner from "../../../share/UI/Spinner/Spinner";
import ATCErrorMsg from "../../../products/components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";

const WhilistProduct = ({ whilistProduct }) => {
  const context = useContext(Context);
  const history = useHistory();
  const cartItemData = context.cartItemData;

  const [loading, setLoading] = useState(false);

  const goToProductDetailHandler = (e, productId) => {
    if (!e.target.closest(".whilist-second")) {
      history.push(`/product/${productId}`);
    }
  };

  const removeAllWhilistHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/whilist/${context.curUser.userId}`
      );
      context.removeAllWhilist();
      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  const hideModalHandler = () => {
    cartItemData.setError(false);
  };

  let whilistProductOutput;

  whilistProductOutput = whilistProduct.map((whilistProduct) => {
    return (
      <div
        onClick={(e) => goToProductDetailHandler(e, whilistProduct._id)}
        className="cart__item"
      >
        <div className="cart__item-about whilist-first">
          <img
            className="cart__item-img"
            src={`${process.env.REACT_APP_BACKEND_URL}/${whilistProduct.imgs[0]}`}
          />
          <div className="cart__item-features">
            <h4 className="cart__item-name">{whilistProduct.brand}</h4>
            <p className="cart__item-price">{whilistProduct.price}</p>
            <p className="cart__item-instock">
              {whilistProduct.features.inStock} in stock
            </p>
          </div>
        </div>
        <div className="whilist-second">
          <RemoveWhilistProduct
            setLoading={(boolean) => setLoading(boolean)}
            productId={whilistProduct._id}
          />
          <AddToCart
            product={whilistProduct}
            itemQuantity={1}
            whilist={true}
            className="whilist-cart"
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <Spinner show={loading || context.cartItemData.loading} />
      <div className="whilist">
        <div className="whilist-product-container">
          <h6 onClick={removeAllWhilistHandler}>Remove All</h6>
          {whilistProductOutput}
        </div>
      </div>
    </>
  );
};

export default WhilistProduct;
