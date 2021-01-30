//Random Products Page

import React, { useState, useEffect } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";
import axios from "axios";

const AllProductsPage = (props) => {
  const [allProducts, setAllProducts] = useState("");

  useEffect(() => {
    (async () => {
      const resp = await axios.get("http://localhost:5000/products");
      setAllProducts(resp.data);
    })();
  }, []);

  return (
    <>
      <AllProducts allProducts={allProducts} />{" "}
    </>
  );
};

export default AllProductsPage;
