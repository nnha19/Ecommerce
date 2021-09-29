//use in allProductsPage

import { createContext, useEffect, useState } from "react";

export const FilterContext = createContext();

const FilterContextProvider = ({ children, showFilter, setShowFilter }) => {
  useEffect(() => {
    const filter = JSON.parse(localStorage.getItem("showFilter"));

    filter && setShowFilter();
  }, []);

  return (
    <FilterContext.Provider value={{ showFilter, setShowFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterContextProvider;
