import React, { useContext, useEffect, useState } from "react";
import "./FilterProducts.css";
import axios from "axios";
import { FilterContext } from "../../../contexts/filterContext";
import Context from "../../../contexts/context";

import BackDrop from "../../../share/UI/BackDrop/BackDrop";
import CheckBoxInput from "../../../share/components/CheckBoxInput/CheckBoxInput";
import Spinner from "../../../share/UI/Spinner/Spinner";

const FilterProducts = ({ allProducts, setAllProducts }) => {
  const { topRef } = useContext(Context);
  const { showFilter, setShowFilter } = useContext(FilterContext);

  const [filterField, setFilterField] = useState({});
  const [filterIsLoading, setFilterIsLoading] = useState(false);
  const filterBy = [
    { brand: ["Ray Band", "AO", "Dior", "Okaley"] },
    { price: ["100", "300", "400", "500", "1000"] },
    { gender: ["male", "female", "unisex"] },
    { size: ["Large", "Medium", "Small", "Free Size"] },
  ];

  const changeValHandler = (e, title) => {
    const { value, checked } = e.target;
    let update;
    if (checked) {
      update = filterField[title] ? [...filterField[title], value] : [value];
    } else {
      update = filterField[title].filter((val) => val !== value);
    }
    const updatedFilterField = { ...filterField, [title]: update };
    setFilterField(updatedFilterField);
    localStorage.setItem("filterField", JSON.stringify(updatedFilterField));
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const filterVals = JSON.parse(localStorage.getItem("filterField"));

    filterVals && setFilterField(filterVals);
  }, []);

  //filtering products
  useEffect(() => {
    const filterKeys = Object.keys(filterField);
    if (filterKeys.length < 1) return;
    let clonedFilterField = { ...filterField };
    filterKeys.forEach((key) => {
      if (filterField[key].length < 1) {
        delete clonedFilterField[key];
        setFilterField(clonedFilterField);
      }
    });

    (async () => {
      setFilterIsLoading(true);
      try {
        const resp = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_BACKEND_URL}/products/filter`,
          data: { filterField: clonedFilterField },
        });
        setAllProducts(resp.data);
      } catch (err) {}
      setFilterIsLoading(false);
    })();
  }, [filterField]);

  const filterList = filterBy.map((f, i) => {
    const key = Object.keys(f)[0];
    return (
      <div key={i} className="filter">
        <h4 className="filter__header">
          Filter by <span>"{key}"</span>
        </h4>
        {f[key].map((val) => {
          const checked =
            filterField[key] &&
            filterField[key].some(
              (filterVal) => filterVal.toLowerCase() === val.toLowerCase()
            );
          return (
            <CheckBoxInput
              key={val}
              changeVal={(e) => changeValHandler(e, key)}
              value={val.toLowerCase()}
              label={`${key === "price" ? `less than ${val}` : val}`}
              checked={checked}
            />
          );
        })}
      </div>
    );
  });

  const clearAllFilterFieldHandler = () => {
    localStorage.removeItem("filterField");
    setFilterField({ brand: [] });
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Spinner show={filterIsLoading} />
      <BackDrop
        className="mobile-backdrop"
        backDropShow={showFilter}
        clicked={setShowFilter}
      />
      <div className={`filter-products ${showFilter ? "show-filter" : ""}`}>
        <i
          onClick={() => setShowFilter(false)}
          className="hide-filter-icon fas fa-times"
        ></i>
        {filterList}
        <div className="clear-filter-container">
          <button
            onClick={clearAllFilterFieldHandler}
            className="clear-filter-btn"
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;
