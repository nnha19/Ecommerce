import React, { useContext, useEffect, useState } from "react";

import "./ProductDetail.css";
import { useInView } from "react-intersection-observer";
import Context from "../../../contexts/context";
import ReviewsAndQuestionsProvider from "../../../contexts/reviewsAndQuestionsContext";

import ManiProduct from "./ManiProduct/ManiProduct";
import AddToWhilist from "../../../cart/components/Cart/AddToWhilist/AddToWhilist";
import MobileProductContent from "../MobileProductContent/MobileProductContent";
import DesktopProductContent from "../DesktopProductContent/DesktopProductContent";
import Admin from "../../../share/components/Admin/Admin";
import StickyCTA from "../StickyCTA/StickyCTA";
import SimilarProducts from "./SimilarProducts/SimilarProducts";
import ReviewsAndQuestions from "./ReviewsAndQuestions/ReviewsAndQuestions";
import PostQuestion from "./PostQuestion/PostQuestion";
import Rate from "./Rate/Rate";

const ProductDetail = ({ productDetail }) => {
  const [questions, setQuestions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { topRef } = useContext(Context);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    //Scroll to top when params change
    if (topRef && topRef.current) {
      topRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [productDetail]);

  const [showDropDown, setShowDropDown] = useState(false);
  const [mainImg, setMainImg] = useState(
    `${process.env.REACT_APP_BACKEND_URL}/${productDetail.imgs[0]}`
  );

  useEffect(() => {
    setMainImg(`${process.env.REACT_APP_BACKEND_URL}/${productDetail.imgs[0]}`);
  }, [productDetail]);

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

  if (!productDetail) {
    return null;
  }
  const setMainImgHandler = (src) => {
    setMainImg(`${process.env.REACT_APP_BACKEND_URL}/${src}`);
  };

  const productImgs = productDetail.imgs.map((img, i) => {
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
              <h4 className="product-detail__name">{productDetail.brand}</h4>
              <Admin>
                <ManiProduct
                  productId={productDetail._id}
                  showDropDown={showDropDown}
                  showDropDownHandler={showDropDownHandler}
                />
              </Admin>
            </div>
            <AddToWhilist product={productDetail} />
            <p className="product-detail__price">{productDetail.price} USD</p>
            <ReviewsAndQuestionsProvider
              questions={questions}
              setQuestions={setQuestions}
            >
              <PostQuestion />
              <Rate />
            </ReviewsAndQuestionsProvider>
            {/* For Mobile */}
            <MobileProductContent product={productDetail} />
            {/*For Desktop */}
            <DesktopProductContent product={productDetail} />
          </div>
          <StickyCTA inView={inView} product={productDetail} />
        </div>
        <div className="more-products">
          <h2>You might also be interested in</h2>
          <SimilarProducts />
        </div>
        <ReviewsAndQuestionsProvider
          questions={questions}
          setQuestions={setQuestions}
          reviews={reviews}
          setReviews={setReviews}
        >
          <ReviewsAndQuestions />
        </ReviewsAndQuestionsProvider>
      </div>
    </>
  );
};

export default ProductDetail;
