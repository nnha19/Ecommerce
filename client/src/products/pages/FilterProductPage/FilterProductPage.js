import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";
import AllProducts from "../../../products/components/AllProducts/AllProducts";

const FilterProductPage = (props) => {
  const gender = useParams().gender;
  const [
    filteredProduct,
    loading,
    error,
    fetchData,
    setFilteredProduct,
  ] = useHttp();

  useEffect(() => {
    console.log(gender);
    fetchData(`http://localhost:5000/products/filter/${gender}`, "get");
  }, [gender]);
  console.log(filteredProduct);
  const capitalizedGender =
    gender.split("")[0].toUpperCase() + gender.substr(1, gender.length);
  return (
    <>
      <Spinner show={loading} />
      <h4>Sunglasses for {capitalizedGender}</h4>
      <AllProducts allProducts={filteredProduct} />
    </>
  );
};

export default FilterProductPage;
