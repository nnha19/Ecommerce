import React, { useContext, useState } from "react";

import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../../../images/logo.png";
import Context from "../../../../contexts/context";
import Login from "./Auth/Login";
import Customer from "./Customer/Customer";
import Category from "./Category/Category";

import "./NavItems.css";

const NavItems = (props) => {
  const history = useHistory();
  const context = useContext(Context);

  const goToCartHandler = () => {
    if (context.authenticated) {
      context.authenticated && history.push("/cart");
    } else {
      context.toggleLogin();
    }
  };

  return (
    <>
      <NavLink className="nav__link" to="/">
        <li className="logo">
          <img className="nav__logo" src={Logo} alt="Logo" />
          <h1 className="nav__name">Ever Vision</h1>
        </li>
      </NavLink>
      <div className="nav__side">
        <form
          className={`nav__search ${context.showSearch ? "show-search" : ""}`}
        >
          <input
            className="nav__search-input"
            type="text"
            placeholder="Search Sunglasses"
          />
          <i className="fas fa-search nav__icon"></i>
        </form>
        <div
          className={`nav__items ${
            context.showSearch ? "nav__items-hide" : ""
          }`}
        >
          <i
            onClick={context.showSearchHandler}
            className="fas fa-search search-icon"
          ></i>
          {!context.authenticated ? <Login /> : null}
          <Category />
          <i
            onClick={goToCartHandler}
            className="shopping-cart fas fa-shopping-cart"
          >
            {context.cartItemAmount ? (
              <span className="shopping-cart__item-qty">
                {context.cartItemAmount}
              </span>
            ) : null}
          </i>
          {context.authenticated && <Customer curUser={context.curUser} />}
        </div>
      </div>
    </>
  );
};

export default NavItems;
