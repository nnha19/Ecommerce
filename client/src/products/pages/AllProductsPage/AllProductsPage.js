import React, { useEffect } from "react";

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
      {allProducts && allProducts.length > 0 && (
        <AllProducts
          setAllProducts={setAllProducts}
          filter={true}
          allProducts={allProducts}
        />
      )}
    </>
  );
};

export default AllProductsPage;
