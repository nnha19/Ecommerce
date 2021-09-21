import React, { useEffect } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";
import { useHttp } from "../../../customHooks/useHttp";
import SkeletonLoading from "../../../share/UI/SkeletonLoading/SkeletonLoading";
import Context from "../../../contexts/context";
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
      <AllProducts filter={true} allProducts={allProducts} />
    </>
  );
};

export default AllProductsPage;
