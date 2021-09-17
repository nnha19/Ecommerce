import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";

const ProductDetailPage = (props) => {
  const productId = useParams().id;

  const [productDetail, loading, error, fetchData, setProductDetail] =
    useHttp();

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
    // fetchData(
    //   `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
    //   "get"
    // );
    setProductDetail({
      brand: "Ray Ban",
      price: 30000,
      onSale: { sale: false },
      imgs: [
        `https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597489492__STD__shad__fr.png?impolicy=SGH_bgtransparent`,
        `https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597489492__STD__shad__qt.png?impolicy=SGH_bgtransparent`,
        `https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597489492__STD__shad__bk.png?impolicy=SGH_bgtransparent`,
        `https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597489492__STD__shad__cfr.png?impolicy=SGH_bgtransparent`,
        `https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597489492__STD__shad__al10.png?impolicy=SGH_bgtransparent`,
      ],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      features: {
        gender: "Man",
        inStock: 4,
        cashOnDelivery: "available",
        warranty: "1 year warranty",
        size: 52,
        return: "7 Days return",
        uv: 400,
      },
    });
  }, []);

  return productDetail ? (
    <>
      <Spinner show={loading} />
      <ProductDetail
        productColorChosen={(e, id) => productColorChosenHandler(e, id)}
        productDetail={productDetail}
      />
    </>
  ) : null;
};

export default ProductDetailPage;
