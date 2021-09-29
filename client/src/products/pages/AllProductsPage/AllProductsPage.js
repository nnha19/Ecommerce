import React, { useContext, useEffect, useState } from "react";

import { Route } from "react-router-dom";
import { useHttp } from "../../../customHooks/useHttp";

import AllProducts from "../../components/AllProducts/AllProducts";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";
import ATCErrorMsg from "../../components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";
import FilterContextProvider from "../../../contexts/filterContext";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import Pagination from "../../components/Pagination/Pagination";

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

  //show filter
  const setShowFilterHandler = () => {
    if (!showFilter) {
      setShowFilter(true);
      JSON.stringify(localStorage.setItem("showFilter", true));
    } else {
      setShowFilter(false);
      JSON.stringify(localStorage.setItem("showFilter", false));
    }
  };

  return (
    <div className="all-products-wrapper">
      <ATCErrorMsg />
      <SkeletonLoading show={loading} />
      <FilterContextProvider
        showFilter={showFilter}
        setShowFilter={setShowFilterHandler}
      >
        {!loading && (
          <button onClick={setShowFilterHandler} className="filter-btn">
            <i className="fas fa-filter"></i>
            Filter
            {filterCount > 0 && (
              <span className="filter-count">({filterCount})</span>
            )}
          </button>
        )}
        <div className="all-products-container">
          {!loading && (
            <FilterProducts
              showFilter={showFilter}
              allProducts={allProducts}
              setShowFilter={setShowFilter}
              setAllProducts={setAllProducts}
            />
          )}
          {allProducts && allProducts.length > 0 && (
            <>
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
            </>
          )}
        </div>
      </FilterContextProvider>
    </div>
  );
};

export default AllProductsPage;
