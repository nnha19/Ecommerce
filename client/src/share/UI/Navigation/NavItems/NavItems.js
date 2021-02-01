import React from "react";

import { NavLink } from "react-router-dom";
import Logo from "../../../../images/logo.png";

import "./NavItems.css";

const NavItems = (props) => {
  return (
    <>
      <NavLink className="nav__link" to="/">
        <li className="logo">
          <img className="nav__logo" src={Logo} alt="Logo" />
          <h1 className="nav__name">Ever Vision</h1>
        </li>
      </NavLink>
      <form className="nav__search">
        <input
          className="nav__search-input"
          type="text"
          placeholder="Search Sunglasses"
        />
        <i className="fas fa-search nav__icon"></i>
      </form>
      <div className="nav__items">
        <NavLink className="nav__link" to="/">
          <li className="nav__item">All</li>
        </NavLink>
        <NavLink className="nav__link" to="/product/men">
          <li className="nav__item">Men</li>
        </NavLink>
        <NavLink className="nav__link" to="/product/women">
          <li className="nav__item">Women</li>
        </NavLink>
        <NavLink className="nav__link" to="/cart">
          <i class="shopping-cart fas fa-shopping-cart"></i>
        </NavLink>
      </div>
    </>
  );
};

export default NavItems;
