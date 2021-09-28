import React, { useContext, useEffect } from "react";

import { Route } from "react-router-dom";
import { useHttp } from "../../../customHooks/useHttp";

import AllProducts from "../../components/AllProducts/AllProducts";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";
import ATCErrorMsg from "../../components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";
import FilterContextProvider from "../../../contexts/filterContext";

const AllProductsPage = (props) => {
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, []);

  return (
    <>
      <ATCErrorMsg />
      <SkeletonLoading show={loading} />
      <FilterContextProvider>
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
      </FilterContextProvider>
    </>
  );
};

export default AllProductsPage;
