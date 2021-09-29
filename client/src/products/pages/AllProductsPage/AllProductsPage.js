import React, { useContext, useEffect, useState } from "react";

import { Route } from "react-router-dom";
import { useHttp } from "../../../customHooks/useHttp";

import AllProducts from "../../components/AllProducts/AllProducts";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";
import ATCErrorMsg from "../../components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";
import FilterContextProvider from "../../../contexts/filterContext";
import FilterProducts from "../../components/FilterProducts/FilterProducts";

const AllProductsPage = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, []);

  //display the number of filters
  const filterField = JSON.parse(localStorage.getItem("filterField"));
  const filterItems = [];
  for (let key in filterField) {
    filterItems.push(filterField[key]);
  }
  const filterCount = filterItems.flat().length;

  return (
    <div className="all-products-wrapper">
      <ATCErrorMsg />
      <SkeletonLoading show={loading} />
      <FilterContextProvider
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      >
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="filter-btn"
        >
          <i className="fas fa-filter"></i>
          Filter
          {filterCount > 0 && (
            <span className="filter-count">({filterCount})</span>
          )}
        </button>

        <div className="all-products-container">
          <FilterProducts
            showFilter={showFilter}
            allProducts={allProducts}
            setShowFilter={setShowFilter}
            setAllProducts={setAllProducts}
          />
          {allProducts && !!allProducts.length && (
            <Route
              exact
              path="/products/"
              component={(props) => (
                <AllProducts
                  {...props}
                  setAllProducts={setAllProducts}
                  homePage={true}
                  allProducts={allProducts}
                />
              )}
            />
          )}
          {allProducts && !!allProducts.length && (
            <Route
              exact
              path="/products/:curPage"
              component={(props) => (
                <AllProducts
                  {...props}
                  setAllProducts={setAllProducts}
                  homePage={true}
                  allProducts={allProducts}
                />
              )}
            />
          )}
        </div>
      </FilterContextProvider>
    </div>
  );
};

export default AllProductsPage;
