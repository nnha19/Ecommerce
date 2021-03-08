import React from "react";

const NavItemSearch = (props) => {
  return (
    <form className={`nav__search ${props.showSearch ? "show-search" : ""}`}>
      <input
        className="nav__search-input"
        type="text"
        placeholder="Search Sunglasses"
      />
      <i className="fas fa-search nav__icon"></i>
    </form>
  );
};

export default NavItemSearch;
