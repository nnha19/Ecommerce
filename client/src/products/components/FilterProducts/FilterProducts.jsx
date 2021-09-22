import React from "react";
import CheckBoxInput from "../../../share/components/CheckBoxInput/CheckBoxInput";

import "./FilterProducts.css";

const FilterProducts = (props) => {
  const filterBy = [
    { brand: ["Ray Band", "AO", "Dior", "Okaley"] },
    { star: ["one star", "two star", "three star", "four star", "five star"] },
  ];

  const changeValHandler = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
  };

  const filterList = filterBy.map((f) => {
    const key = Object.keys(f);
    return (
      <div className="filter">
        <h4 className="filter__header">{key}</h4>
        {f[key].map((val) => {
          return <CheckBoxInput value={val.toLowerCase()} label={val} />;
        })}
      </div>
    );
  });

  return <div className="filter-products">{filterList}</div>;
};

export default FilterProducts;
