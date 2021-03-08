import React, { useState, useContext } from "react";

import "./ProductDetail.css";

import ProductDetailBody from "./ProductDetailBody/ProductDetailBody";
import ProductFeatures from "./ProductFeatures/ProductFeatures";
import Modal from "../../../share/UI/Modal/Modal";
import Button from "../../../share/components/button/button";
import ManiProduct from "./ManiProduct/ManiProduct";
import Context from "../../../contexts/context";
import BackDrop from "../../../share/UI/BackDrop/BackDrop";

const ProductDetail = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const context = useContext(Context);

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const showDropDownHandler = (e) => {
    setShowDropDown(true);
  };

  const hideDropDownHandler = (e) => {
    if (
      !e.target.closest(".mani-product-container") ||
      e.target.closest(".delete")
    ) {
      setShowDropDown(false);
    }
  };

  const showFeaturesHandler = () => {
    setShowFeatures(true);
  };

  const hideShowFeaturesHandler = () => {
    setShowFeatures(false);
  };

  let colorOptions;
  const product = props.productDetail;
  if (product && product.colors && product.colors.length > 0) {
    colorOptions = product.colors.map((c) => {
      return (
        <button
          key={c._id}
          onClick={(e) => props.productColorChosen(e, c._id)}
          className={`product-color ${c.choosen && "product-color-active"}`}
        >
          {c.color}
        </button>
      );
    });
  }
  if (!product) {
    return null;
  }
  return (
    <>
      <BackDrop clicked={hideShowFeaturesHandler} backDropShow={showFeatures} />
      <Modal
        modalShow={showModal}
        title="Item already exists"
        body={
          <>
            <p className="modal__paragraph">
              This item already exists in the cart.Do you want to replace it?
            </p>
            <Button className="modal__btn">Replace</Button>
            <Button clicked={hideModalHandler} className="modal__cancel">
              Cancel
            </Button>
          </>
        }
      />
      <div className="product-detail-container">
        <div onClick={hideDropDownHandler} className="product-detail">
          <div className="product-detail__img-container">
            <img className="product-detail__img" src={product.image} />
            <div className="product-detail__edit">
              <div className="product-colors">{colorOptions}</div>
              {context.curUser && context.curUser.admin && (
                <ManiProduct
                  productId={product._id}
                  showDropDown={showDropDown}
                  showDropDownHandler={showDropDownHandler}
                />
              )}
            </div>
          </div>
          <ProductDetailBody
            showFeatures={showFeaturesHandler}
            product={product}
          />
          <ProductFeatures
            showFeatures={showFeatures}
            productFeatures={product.features}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
