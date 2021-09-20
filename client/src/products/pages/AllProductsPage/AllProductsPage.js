//Random Products Page

import React, { useState, useEffect } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";

const AllProductsPage = (props) => {
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, []);
  return (
    <>
      <Spinner show={loading} />
      <AllProducts allProducts={allProducts} />{" "}
    </>
  );
};

export default AllProductsPage;
