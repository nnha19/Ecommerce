import React, { useEffect, useState } from "react";
import { useHttp } from "../../../../customHooks/useHttp";

import AllProducts from "../../AllProducts/AllProducts";

const SimilarProducts = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [
    allProducts,
    loading,
    error,
    fetchData,
    setAllProducts,
    setError,
    finished,
  ] = useHttp();
  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products`, "get");
  }, []);

  console.log(allProducts);

  return <AllProducts />;
};

export default SimilarProducts;
