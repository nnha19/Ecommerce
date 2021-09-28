import React, { useContext, useEffect, useState } from "react";
import "./FilterProducts.css";
import axios from "axios";
import { FilterContext } from "../../../contexts/filterContext";
import Context from "../../../contexts/context";

import Button from "../../../share/components/button/button";
import BackDrop from "../../../share/UI/BackDrop/BackDrop";
import CheckBoxInput from "../../../share/components/CheckBoxInput/CheckBoxInput";
import Spinner from "../../../share/UI/Spinner/Spinner";

const FilterProducts = ({ allProducts, setResultProducts }) => {
  const { topRef } = useContext(Context);
  const { showFilter, setShowFilter } = useContext(FilterContext);

  const [filterField, setFilterField] = useState({});
  const [filterIsLoading, setFilterIsLoading] = useState(false);
  const filterBy = [
    { brand: ["Ray Band", "AO", "Dior", "Okaley"] },
    { star: ["one star", "two star", "three star", "four star", "five star"] },
    { price: ["100", "300", "400", "500", "1000"] },
    { gender: ["male", "female", "unisex"] },
    { size: ["Large", "Medium", "Small"] },
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

  useEffect(() => {
    const filterKeys = Object.keys(filterField);

    let clonedFilterField;
    if (filterKeys.length > 0) {
      filterKeys.forEach((key) => {
        if (filterField[key].length < 1) {
          clonedFilterField = { ...filterField };
          delete clonedFilterField[key];
          setFilterField(clonedFilterField);
        }
      });
      if (clonedFilterField && Object.keys(clonedFilterField).length < 1)
        return;

      (async () => {
        setFilterIsLoading(true);
        try {
          const resp = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}/products/filter`,
            data: { filterField },
          });
          setResultProducts(resp.data);
        } catch (err) {
          alert(err);
        }
        setFilterIsLoading(false);
      })();
    } else {
      setResultProducts(allProducts);
    }
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
    setFilterField({});
    localStorage.removeItem("filterField");
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Spinner show={filterIsLoading} />
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

        <button
          onClick={clearAllFilterFieldHandler}
          className="clear-filter-btn"
        >
          Clear All
        </button>
      </div>
    </>
  );
};

export default FilterProducts;
