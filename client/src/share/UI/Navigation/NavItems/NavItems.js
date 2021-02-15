import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import Logo from "../../../../images/logo.png";
import "../../../../contexts/context";
import Context from "../../../../contexts/context";
import "./NavItems.css";

const NavItems = (props) => {
  const context = useContext(Context);

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
        <NavLink className="nav__link" to="/product/filter/male">
          <li className="nav__item">Men</li>
        </NavLink>
        <NavLink className="nav__link" to="/product/filter/female">
          <li className="nav__item">Women</li>
        </NavLink>
        <NavLink className="nav__link" to="/cart">
          <i className="shopping-cart fas fa-shopping-cart">
            {props.cartItemAmount ? (
              <span className="shopping-cart__item-qty">
                {props.cartItemAmount}
              </span>
            ) : null}
          </i>
        </NavLink>
      </div>
    </>
  );
};

export default NavItems;
