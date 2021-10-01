import axios from "axios";
import React, { useEffect, useState } from "react";
import Home from "../components/Home/Home";
import SliderSkeletonLoading from "../components/SliderSkeletonLoading/SliderSkeletonLoading";

import TrendingProducts from "../components/TrendingProducts/TrendingProducts";

const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState({
    products: [],
    loading: false,
  });
  const [bestSellerProducts, setBestSellerProducts] = useState({
    products: [],
    loading: false,
  });
  const [latestArrivals, setLatestArrivals] = useState({
    products: [],
    loading: false,
  });

  async function getRandomProducts(state, setState, count) {
    setState({ ...state, loading: true });
    const res = await axios(
      `${process.env.REACT_APP_BACKEND_URL}/products/random/${count}`
    );
    setState({ ...state, products: res.data, loading: false });
  }

  useEffect(() => {
    getRandomProducts(trendingProducts, setTrendingProducts, 10);
    getRandomProducts(bestSellerProducts, setBestSellerProducts, 15);
    getRandomProducts(latestArrivals, setLatestArrivals, 7);
  }, []);

  const productsArr = [trendingProducts, bestSellerProducts, latestArrivals];
  const skeletonLoading = productsArr.map((obj) => {
    if (obj.loading) {
      return <SliderSkeletonLoading />;
    }
  });

  return (
    <>
      <Home />
      {skeletonLoading}
      {!!trendingProducts.products.length && (
        <TrendingProducts
          products={trendingProducts.products}
          title="Trending Now"
        />
      )}
      {!!bestSellerProducts.products.length && (
        <TrendingProducts
          products={bestSellerProducts.products}
          title="Best Seller"
        />
      )}
      {!!latestArrivals.products.length && (
        <TrendingProducts
          products={latestArrivals.products}
          title="Latest Arrivals"
        />
      )}
    </>
  );
};

export default HomePage;
