import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Category.css";

const Category = (props) => {
  const [showCategory, setShowCategory] = useState(false);

  const showCategoryHandler = () => {
    setShowCategory(!showCategory);
  };

  return (
    <li onClick={showCategoryHandler} className="nav__item category">
      Category
      <ul className={`category__items ${showCategory && "show-category"}`}>
        <NavLink className="nav__link" to="/">
          <li className="nav__category-item">All</li>
        </NavLink>
        <NavLink className="nav__link" to="/product/filter/male">
          <li className="nav__category-item">Men</li>
        </NavLink>
        <NavLink className="nav__link" to="/product/filter/female">
          <li className="nav__category-item">Women</li>
        </NavLink>
      </ul>
    </li>
  );
};

export default Category;
