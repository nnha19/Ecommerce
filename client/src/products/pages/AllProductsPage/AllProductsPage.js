import React, { useEffect } from "react";

import { Route } from "react-router-dom";

import AllProducts from "../../components/AllProducts/AllProducts";
import { useHttp } from "../../../customHooks/useHttp";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";
import ATCErrorMsg from "../../components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";

const AllProductsPage = (props) => {
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, []);

  return (
    <>
      <ATCErrorMsg />
      <SkeletonLoading show={loading} />
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
    </>
  );
};

export default AllProductsPage;
