import React, { useContext } from "react";

import "./Desktop.css";
import { LogoNavItem, NavItemCart, NavItemLink } from "../NavItems/NavItems";
import Login from "../NavItems/Auth/Login";
import Customer from "../NavItems/Customer/Customer";
import Context from "../../../../contexts/context";
const Desktop = (props) => {
  const context = useContext(Context);
  return (
    <ul className={`desktop-nav`}>
      <LogoNavItem />
      <div className="desktop-nav__right">
        <NavItemLink className="desktop-nav__link" to="/">
          Home
        </NavItemLink>
        <NavItemLink className="desktop-nav__link" to="/products">
          Shop
        </NavItemLink>
        {!context.authenticated ? <Login /> : <Customer />}
        <NavItemCart />
      </div>
    </ul>
  );
};

export default Desktop;
