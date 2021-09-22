import React, { useEffect, useState } from "react";
import CheckBoxInput from "../../../share/components/CheckBoxInput/CheckBoxInput";
import BackDrop from "../../../share/UI/BackDrop/BackDrop";

import "./FilterProducts.css";

const FilterProducts = ({
  allProducts,
  setResultProducts,
  showFilter,
  setShowFilter,
}) => {
  const [filterField, setFilterField] = useState({});
  const filterBy = [
    { brand: ["Ray Band", "AO", "Dior", "Okaley"] },
    { star: ["one star", "two star", "three star", "four star", "five star"] },
    { price: ["100", "200", "300", "400", "500"] },
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
    const filterKeys = Object.keys(filterField);

    if (filterKeys[0] && filterField[filterKeys[0]].length > 0) {
      const filtered = allProducts.filter((product) => {
        const result = Object.keys(filterField).reduce((acc, filter) => {
          const filterValues = filterField[filter];
          const productValue = product[filter];
          //This line defines what is your match
          const found = filterValues.find((fv) => {
            if (filter === "price") {
              return parseInt(productValue) < parseInt(fv);
            }
            return fv == productValue.toString().toLowerCase();
          });
          return acc && found;
        }, true);

        return result;
      });

      setResultProducts(filtered);
    } else {
      setResultProducts(allProducts);
    }
  }, [filterField]);

  const filterList = filterBy.map((f, i) => {
    const key = Object.keys(f)[0];
    return (
      <div key={i} className="filter">
        <h4 className="filter__header">{key}</h4>
        {f[key].map((val) => {
          return (
            <CheckBoxInput
              key={val}
              changeVal={(e) => changeValHandler(e, key)}
              value={val.toLowerCase()}
              label={`${key === "price" ? `less than ${val}` : val}`}
            />
          );
        })}
      </div>
    );
  });

  return (
    <>
      <BackDrop
        className="mobile-backdrop"
        backDropShow={showFilter}
        clicked={() => setShowFilter(false)}
      />
      <div className={`filter-products ${showFilter ? "show-filter" : ""}`}>
        <i
          onClick={() => setShowFilter(false)}
          className="hide-filter-icon fas fa-times"
        ></i>
        {filterList}
      </div>
    </>
  );
};

export default FilterProducts;
