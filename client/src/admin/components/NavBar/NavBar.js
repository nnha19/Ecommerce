import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = (props) => {
  console.log(props);
  return (
    <nav classNam="admin-nav">
      <ul className="admin-nav__items">
        <NavLink
          className="nav__link"
          to={`/admin/order/${props.curUser.userId}`}
        >
          <li className="admin-nav__item">All Orders</li>
        </NavLink>
        <NavLink className="nav__link" to={`/admin/product/create`}>
          <li className="admin-nav__item">Create Item</li>
        </NavLink>
        <NavLink className="nav__link" to="/admin/coupon">
          <li className="admin-nav__item">Coupons</li>
        </NavLink>
        <NavLink className="nav__link" to="/admin/coupon/create">
          <li className="admin-nav__item">Add Coupons</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default NavBar;
