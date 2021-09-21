//Random Products Page

import React, { useState, useEffect, useContext } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";
import { useHttp } from "../../../customHooks/useHttp";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";
import Context from "../../../contexts/context";
import ATCErrorMsg from "../../components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";

const AllProductsPage = (props) => {
  const { cartItemData } = useContext(Context);
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, []);

  return (
    <>
      <ATCErrorMsg />
      <SkeletonLoading show={loading} />
      <AllProducts allProducts={allProducts} />{" "}
    </>
  );
};

export default AllProductsPage;
