import React, { useRef, useState } from "react";

import "./TrendingProducts.css";
import Img from "../../../assets/sunglasses-pic.webp";

import SecondaryBtn from "../../../share/components/SecondaryBtn/SecondaryBtn";
import AddToWhilist from "../../../cart/components/Cart/AddToWhilist/AddToWhilist";

const TrendingProducts = ({ title, products }) => {
  const { innerWidth: wWidth } = window;
  const [currentPosition, setCurrentPosition] = useState(0);
  let productsPerView = 5;
  if (wWidth < 1100 && wWidth > 900) {
    productsPerView = 4;
  } else if (wWidth < 900 && wWidth > 600) {
    productsPerView = 3;
  } else if (wWidth < 600) {
    productsPerView = 2;
  }

  const sliderRef = useRef();
  const containerRef = useRef();
  const [curIndex, setCurIndex] = useState(productsPerView);

  const productWidth =
    containerRef.current &&
    containerRef.current.getBoundingClientRect().width / productsPerView;

  const productLists = products.map((product) => {
    return (
      <div
        style={{ width: `${productWidth - 16}px` }}
        className="trending-product"
      >
        <AddToWhilist />
        <img src={Img} />
        <div className="trending-product__body">
          <h4>Ray Band</h4>
          <p className="trending-product__price">1200 USD</p>
          <SecondaryBtn className="trending-product__btn">
            Add To Cart
          </SecondaryBtn>
        </div>
      </div>
    );
  });

  const slideHandler = (type) => {
    const { current: slider } = sliderRef;
    let nextPosition;
    if (type === "next") {
      nextPosition = currentPosition - productWidth;
      slider.style.transform = `translateX(${nextPosition}px)`;
      setCurIndex((prev) => prev + 1);
    } else {
      nextPosition = currentPosition + productWidth;
      slider.style.transform = `translateX(${nextPosition}px)`;
      setCurIndex((prev) => prev - 1);
    }
    setCurrentPosition(nextPosition);
  };

  return (
    <section className="trending-section home-container">
      <h2 className="">{title}</h2>
      <div ref={containerRef} className="slider ">
        <div ref={sliderRef} className="trending-products">
          {productLists}
        </div>
        <button
          disabled={curIndex == products.length}
          onClick={() => slideHandler("next")}
          className="slide next-slide"
        >
          <i class="fas fa-angle-right"></i>
        </button>
        <button
          disabled={curIndex == productsPerView}
          onClick={() => slideHandler("prev")}
          className="slide prev-slide"
        >
          <i class="fas fa-angle-left"></i>
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;
