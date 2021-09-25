import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { useHttp } from "../../../customHooks/useHttp";
import ATCErrorMsg from "../../components/ProductDetail/ProductDetailBody/ATCErrorMsg/ATCErrorMsg";
import ProductDetailSkeleton from "../../../share/UI/ProductDetailSkeleton/ProductDetailSkeleton";

const ProductDetailPage = (props) => {
  const productId = useParams().id;

  const [productDetail, loading, error, fetchData, setProductDetail] =
    useHttp();

  useEffect(() => {
    //fetch detail of a product
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
      "get"
    );
  }, [productId]);
  return (
    <>
      {loading && <ProductDetailSkeleton />}
      {productDetail ? (
        <>
          <ATCErrorMsg />
          <ProductDetail productDetail={productDetail} />
        </>
      ) : null}
    </>
  );
};

export default ProductDetailPage;
