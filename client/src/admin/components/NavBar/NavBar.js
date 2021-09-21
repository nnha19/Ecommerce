import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

import AdminNavItems from "./AdminNavItems/AdminNavItems";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";

const NavBar = (props) => {
  return (
    <nav className="admin-nav">
      <HamburgerIcon curUser={props.curUser && props.curUser} />
      <ul className="admin-nav__items">
        <AdminNavItems curUser={props.curUser && props.curUser} />
      </ul>
    </nav>
  );
};

export default NavBar;
