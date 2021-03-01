import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";

const ProductDetailPage = (props) => {
  const productId = useParams().id;

  const [
    productDetail,
    loading,
    error,
    fetchData,
    setProductDetail,
  ] = useHttp();
  const productColorChosenHandler = (e, id) => {
    const productDetailColors = [...productDetail.colors];
    const colors = productDetailColors.map((c) => {
      console.log(id);
      if (c._id === id) {
        return (c.choosen = true);
      } else {
        return (c.choosen = false);
      }
    });
    setProductDetail({ ...productDetail, colors: productDetailColors });
  };

  useEffect(() => {
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
      "get"
    );
  }, []);

  return (
    <>
      <Spinner show={loading} />
      <ProductDetail
        productColorChosen={(e, id) => productColorChosenHandler(e, id)}
        productDetail={productDetail}
      />
    </>
  );
};

export default ProductDetailPage;
