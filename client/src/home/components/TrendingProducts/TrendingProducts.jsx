import React, { useEffect, useRef, useState } from "react";

import "./TrendingProducts.css";

import AllProducts from "../../../products/components/AllProducts/AllProducts";

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
  const [productWidth, setProductWidth] = useState(undefined);

  const containerWidth =
    containerRef.current && containerRef.current.getBoundingClientRect().width;

  useEffect(() => {
    setProductWidth(containerWidth / productsPerView);
  }, [containerWidth]);

  const slideHandler = (type) => {
    if (productWidth === undefined) return;
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
          <AllProducts
            allProducts={products}
            sliderWrapperStyle={{
              width: productWidth - 16,
              marginRight: "1rem",
            }}
          />
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
