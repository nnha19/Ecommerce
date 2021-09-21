import React from "react";
import CheckBoxInput from "../../../share/components/CheckBoxInput/CheckBoxInput";

import "./FilterProducts.css";

const FilterProducts = (props) => {
  const filterBy = [
    {
      brand: ["Ray Band", "AO", "Okaley", "Dior"],
      date: ["Newest", "Any"],
    },
  ];

  const changeValHandler = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
  };

  const filterList = filterBy.map((type, i) => {});

  return <div className="filter-products">{filterList}</div>;
};

export default FilterProducts;
