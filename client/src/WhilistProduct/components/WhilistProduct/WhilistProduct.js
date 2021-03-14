import React, { useContext, useState } from "react";

import "./WhilistProduct.css";

import { useHistory } from "react-router-dom";
import axios from "axios";

import RemoveWhilistProduct from "./RemoveWhilistProduct/RemoveWhilistProduct";
import AddToCart from "../../../products/components/ProductDetail/ProductDetailBody/AddToCart/AddToCart";
import Context from "../../../contexts/context";

const WhilistProduct = (props) => {
  const context = useContext(Context);
  const history = useHistory();

  const [addedToCart, setAddedToCart] = useState(false);

  const goToProductDetailHandler = (e, productId) => {
    if (!e.target.closest(".whilist-second")) {
      history.push(`/product/${productId}`);
    }
  };

  const removeAllWhilistHandler = async () => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/whilist/${context.curUser.userId}`
    );
    context.removeAllWhilist();
  };

  let whilistProductOutput;

  whilistProductOutput = props.whilistProduct.map((whilistProduct) => {
    return (
      <div
        onClick={(e) => goToProductDetailHandler(e, whilistProduct._id)}
        className="cart__item"
      >
        <div className="cart__item-about whilist-first">
          <img className="cart__item-img" src={whilistProduct.image} />
          <div className="cart__item-features">
            <h4 className="cart__item-name">{whilistProduct.brand}</h4>
            <p className="cart__item-price">{whilistProduct.price}</p>
            <p className="cart__item-instock">
              {whilistProduct.features.inStock} in stock
            </p>
          </div>
        </div>
        <div className="whilist-second">
          <RemoveWhilistProduct productId={whilistProduct._id} />
          <AddToCart
            product={whilistProduct}
            context={context}
            itemQuantity={1}
            setAddedToCart={(boolean) => setAddedToCart(boolean)}
            error={{}}
            whilist={true}
            className="whilist-cart"
          />
        </div>
      </div>
    );
  });

  return props.whilistProduct.length > 0 ? (
    <div className="whilist">
      <h4>Your favouritee products</h4>
      <div className="whilist-product-container">
        <h6 onClick={removeAllWhilistHandler}>Remove All</h6>
        {whilistProductOutput}
      </div>
    </div>
  ) : (
    <div className="error-container">
      <p className="error">No whilist products.</p>
    </div>
  );
};

export default WhilistProduct;
