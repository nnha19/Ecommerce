//Random Products Page

import React, { useState, useEffect } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import axios from "axios";

const AllProductsPage = (props) => {
  const [allProducts, loading, error, fetchData, setAllProducts] = useHttp([]);

  console.log(allProducts);

  const deleteProduct = (productId) => {
    const remainProducts = allProducts.filter(
      (product) => product._id !== productId
    );
    setAllProducts(remainProducts);
  };

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
