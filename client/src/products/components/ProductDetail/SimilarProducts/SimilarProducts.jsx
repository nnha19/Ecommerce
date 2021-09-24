import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttp } from "../../../../customHooks/useHttp";

import AllProducts from "../../AllProducts/AllProducts";

const SimilarProducts = (props) => {
  const { id } = useParams();
  const [moreProducts, setMoreProducts] = useState([]);
  const [allProducts, , , fetchData, , , ,] = useHttp();
  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, [id]);

  useEffect(() => {
    if (!allProducts || allProducts.length < 1) {
      return;
    }
    const withoutCurrentProduct = allProducts.filter((product) => {
      return product._id !== id;
    });
    let finalResult = [];
    if (withoutCurrentProduct.length < 10) {
      finalResult = withoutCurrentProduct;
    } else {
      while (finalResult.length !== 10) {
        finalResult.push(
          withoutCurrentProduct.splice(
            Math.floor(Math.random() * withoutCurrentProduct.length),
            1
          )[0]
        );
      }
    }
    setMoreProducts(finalResult);
  }, [allProducts]);

  return moreProducts && moreProducts.length > 0 ? (
    <AllProducts style={{ padding: "2rem 0" }} allProducts={moreProducts} />
  ) : null;
};

export default SimilarProducts;
