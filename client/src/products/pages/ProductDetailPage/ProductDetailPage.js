import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductDetail from "../../components/ProductDetail/ProductDetail";

const ProductDetailPage = (props) => {
  const productId = useParams().id;

  const [productDetail, setProductDetail] = useState("");

  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        `http://localhost:5000/products/${productId}`
      );
      setProductDetail(resp.data);
    })();
  }, []);

  return (
    <>
      <ProductDetail productDetail={productDetail} />
    </>
  );
};

export default ProductDetailPage;
