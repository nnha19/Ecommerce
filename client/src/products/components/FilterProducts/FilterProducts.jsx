import React, { useEffect, useState } from "react";
import CheckBoxInput from "../../../share/components/CheckBoxInput/CheckBoxInput";

import "./FilterProducts.css";

const FilterProducts = ({ allProducts }) => {
  const [filterField, setFilterField] = useState({});
  const filterBy = [
    { brand: ["Ray Band", "AO", "Dior", "Okaley"] },
    { star: ["one star", "two star", "three star", "four star", "five star"] },
    { price: ["Less than 100", "Less than 200", "Less than 500"] },
  ];

  const changeValHandler = (e, title) => {
    const { value, checked } = e.target;
    let update;
    if (checked) {
      update = filterField[title] ? [...filterField[title], value] : [value];
    } else {
      update = filterField[title].filter((val) => val !== value);
    }
    setFilterField({ ...filterField, [title]: update });
  };

  useEffect(() => {
    allProducts;
  }, [filterField]);

  const filterList = filterBy.map((f, i) => {
    const key = Object.keys(f);
    return (
      <div key={i} className="filter">
        <h4 className="filter__header">{key}</h4>
        {f[key].map((val) => {
          return (
            <CheckBoxInput
              changeVal={(e) => changeValHandler(e, key)}
              value={val.toLowerCase()}
              label={val}
            />
          );
        })}
      </div>
    );
  });

  return <div className="filter-products">{filterList}</div>;
};

export default FilterProducts;
