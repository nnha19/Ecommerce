//Random Products Page

import React, { useState, useEffect } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import axios from "axios";

const AllProductsPage = (props) => {
  const [allProducts, loading, error, fetchData] = useHttp([]);

  useEffect(() => {
    fetchData("http://localhost:5000/products", "get");
  }, []);
  return (
    <>
      <Spinner show={loading} />
      <AllProducts allProducts={allProducts} />{" "}
    </>
  );
};

export default AllProductsPage;
