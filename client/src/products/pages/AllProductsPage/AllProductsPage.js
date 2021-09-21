//Random Products Page

import React, { useState, useEffect } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";
import { useHttp } from "../../../customHooks/useHttp";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";

const AllProductsPage = (props) => {
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, []);
  return (
    <>
      <SkeletonLoading show={loading} />
      <AllProducts allProducts={allProducts} />{" "}
    </>
  );
};

export default AllProductsPage;
