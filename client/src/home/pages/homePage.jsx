import React from "react";
import Home from "../components/Home/Home";

import TrendingProducts from "../components/TrendingProducts/TrendingProducts";

const HomePage = () => {
  return (
    <>
      <Home />
      <TrendingProducts
        products={Array.from(new Array(7))}
        title="Trending Now"
      />
      <TrendingProducts
        products={Array.from(new Array(12))}
        title="Latest Arrivals"
      />
      <TrendingProducts
        products={Array.from(new Array(10))}
        title="Best Seller"
      />
    </>
  );
};

export default HomePage;
