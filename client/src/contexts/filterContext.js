//use in allProductsPage

import { createContext, useEffect, useState } from "react";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const filter = JSON.parse(localStorage.getItem("showFilter"));
    console.log(filter);
    setShowFilter(filter);
  }, []);

  const setShowFilterHandler = (boolean) => {
    if (boolean) {
      setShowFilter(true);
      JSON.stringify(localStorage.setItem("showFilter", true));
    } else {
      setShowFilter(false);
      JSON.stringify(localStorage.setItem("showFilter", false));
    }
  };

  return (
    <FilterContext.Provider
      value={{ showFilter, setShowFilter: setShowFilterHandler }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export default FilterContextProvider;
