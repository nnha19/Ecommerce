import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";
import axios from "axios";

import ProductDetail from "../../components/ProductDetail/ProductDetail";

const ProductDetailPage = (props) => {
  const productId = useParams().id;

  const [productDetail, loading, error, fetchData] = useHttp();

  useEffect(() => {
    fetchData(`http://localhost:5000/products/${productId}`, "get");
  }, []);

  return (
    <>
      <Spinner show={loading} />
      <ProductDetail productDetail={productDetail} />
    </>
  );
};

export default ProductDetailPage;
