import React, { useContext, useEffect, useState } from "react";

import { Route, Switch } from "react-router-dom";
import { useHttp } from "../../../customHooks/useHttp";

import AllProducts from "../../components/AllProducts/AllProducts";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";
import ATCErrorMsg from "../../components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";
import FilterContextProvider from "../../../contexts/filterContext";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import Pagination from "../../components/Pagination/Pagination";
import NoProductsError from "../../components/AllProducts/NoProductsError/NoProductsError";

const AllProductsPage = () => {
  const [curPage, setCurPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);
  const [resultProducts, setResultProducts] = useState(allProducts);
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
              allProducts={resultProducts}
              setShowFilter={setShowFilter}
              setAllProducts={setAllProducts}
            />
          )}
          {allProducts && allProducts.length > 0 ? (
            <>
              <Route
                exact
                path="/products/"
                render={(props) => (
                  <AllProducts
                    {...props}
                    setAllProducts={setAllProducts}
                    allProducts={resultProducts}
                  />
                )}
              />
              <Route
                exact
                path="/products/:curPage"
                render={(props) => (
                  <AllProducts
                    {...props}
                    setCurPage={setCurPage}
                    setAllProducts={setAllProducts}
                    allProducts={resultProducts}
                  />
                )}
              />
            </>
          ) : (
            <NoProductsError loading={loading} />
          )}
        </div>
        {allProducts && allProducts.length > 0 && (
          <Pagination
            curPage={curPage}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            setResultProducts={setResultProducts}
          />
        )}
      </FilterContextProvider>
    </div>
  );
};

export default AllProductsPage;
