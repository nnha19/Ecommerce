import React, { useState, useContext, useEffect } from "react";

import "./ProductDetail.css";
import { useInView } from "react-intersection-observer";

import Modal from "../../../share/UI/Modal/Modal";
import Button from "../../../share/components/button/button";
import ManiProduct from "./ManiProduct/ManiProduct";
import Context from "../../../contexts/context";
import AddToWhilist from "../../../cart/components/Cart/AddToWhilist/AddToWhilist";
import MobileProductContent from "../MobileProductContent/MobileProductContent";
import DesktopProductContent from "../DesktopProductContent/DesktopProductContent";
import Admin from "../../../share/components/Admin/Admin";
import StickyCTA from "../StickyCTA/StickyCTA";
import SimilarProducts from "./SimilarProducts/SimilarProducts";

const ProductDetail = (props) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const product = props.productDetail;
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [mainImg, setMainImg] = useState(
    `${process.env.REACT_APP_BACKEND_URL}/${product.imgs[0]}`
  );
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

  if (!product) {
    return null;
  }
  const setMainImgHandler = (src) => {
    setMainImg(`${process.env.REACT_APP_BACKEND_URL}/${src}`);
  };

  const productImgs = product.imgs.map((img, i) => {
    const src = `${process.env.REACT_APP_BACKEND_URL}/${img}`;
    return (
      <img
        key={i}
        onClick={() => setMainImgHandler(img)}
        className={`product-detail__img ${
          mainImg === src ? "img-active" : ""
        } `}
        src={src}
      />
    );
  });

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
        <div ref={ref} onClick={hideDropDownHandler} className="product-detail">
          <div className="product-detail__img-container">
            <div className="product-detail__imgs">
              <img className="main-img" src={mainImg} />
              <div className="small-imgs">{productImgs}</div>
            </div>
          </div>
          <div className="product-detail__content">
            <div className="product-detail__edit">
              <h4 className="product-detail__name">{product.brand}</h4>
              <Admin>
                <ManiProduct
                  productId={product._id}
                  showDropDown={showDropDown}
                  showDropDownHandler={showDropDownHandler}
                />
              </Admin>
            </div>
            <AddToWhilist product={product} />
            <p className="product-detail__price">{product.price} KS</p>
            {/* For Mobile */}
            <MobileProductContent product={product} />
            {/*For Desktop */}
            <DesktopProductContent product={product} />
          </div>
          <StickyCTA inView={inView} product={product} />
        </div>
        <SimilarProducts />
      </div>
    </>
  );
};

export default ProductDetail;
