import React, { useState } from "react";

import "./HamburgerIcon.css";
import AdminNavItems from "../AdminNavItems/AdminNavItems";

const HamburgerIcon = (props) => {
  const [showAdminNav, setShowAdminNav] = useState(false);

  const toggleAdminNavHandler = () => {
    setShowAdminNav(!showAdminNav);
  };

  const hideAdminNavHandler = () => {
    setShowAdminNav(false);
  };

  return (
    <div className="admin-nav-container">
      <div onClick={toggleAdminNavHandler} className="hamburger">
        {!showAdminNav ? (
          <span className="hamburger__icon"></span>
        ) : (
          <span className="cross"></span>
        )}
      </div>
      <ul
        onClick={hideAdminNavHandler}
        className={`admin-mobile-nav ${showAdminNav ? "show-admin-nav" : ""}`}
      >
        <AdminNavItems showAdminNav={showAdminNav} curUser={props.curUser} />
      </ul>
    </div>
  );
};

export default HamburgerIcon;
