import React, { useState, useContext, useEffect } from "react";

import "./ProductDetail.css";

import ProductDetailBody from "./ProductDetailBody/ProductDetailBody";
import ProductFeatures from "./ProductFeatures/ProductFeatures";
import Modal from "../../../share/UI/Modal/Modal";
import Button from "../../../share/components/button/button";
import ManiProduct from "./ManiProduct/ManiProduct";
import Context from "../../../contexts/context";
import BackDrop from "../../../share/UI/BackDrop/BackDrop";
import AddToWhilist from "../../../cart/components/Cart/AddToWhilist/AddToWhilist";
import MobileProductContent from "../MobileProductContent/MobileProductContent";
import DesktopProductContent from "../DesktopProductContent/DesktopProductContent";

const ProductDetail = (props) => {
  const product = props.productDetail;
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [mainImg, setMainImg] = useState(product.imgs[0]);
  const [addedToWhilist, setAddedToWhilist] = useState(false);
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

  useEffect(() => {
    if (product && context.whilist) {
      const addedToWhilist = context.whilist.some(
        (whilist) => whilist._id === product._id
      );
      setAddedToWhilist(addedToWhilist);
    }
  }, [product, context.whilist]);

  if (!product) {
    return null;
  }
  const setMainImgHandler = (src) => {
    setMainImg(src);
  };

  const productImgs = product.imgs.map((img, i) => (
    <img
      key={i}
      onClick={() => setMainImgHandler(img)}
      className="product-detail__img"
      src={img}
    />
  ));

  return (
    <>
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
            <div className="product-detail__imgs">
              <img className="main-img" src={mainImg} />
              <div className="small-imgs">{productImgs}</div>
            </div>
            <div className="product-detail__edit">
              {context.curUser && context.curUser.admin && (
                <ManiProduct
                  productId={product._id}
                  showDropDown={showDropDown}
                  showDropDownHandler={showDropDownHandler}
                />
              )}
            </div>
          </div>
          <div className="product-detail__content">
            <h4 className="product-detail__name">{product.brand}</h4>
            <AddToWhilist
              addedToWhilist={addedToWhilist}
              productId={product._id}
              userId={context.curUser && context.curUser.userId}
            />
            <p className="product-detail__price">{product.price} KS</p>
            {/* For Mobile */}
            <MobileProductContent product={product} />
            {/*For Desktop */}
            <DesktopProductContent product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
