import React, { useState } from "react";

import "./HamburgerIcon.css";

const HamburgerIcon = (props) => {
  const [showAdminNav, setShowAdminNav] = useState(false);

  const toggleAdminNavHandler = () => {
    setShowAdminNav(!showAdminNav);
  };

  return (
    <div className="admin-nav-container">
      <div onClick={toggleAdminNavHandler} className="hamburger">
        <span className="hamburger__icon"></span>
      </div>
      <div
        className={`admin-nav__items-container ${
          showAdminNav ? "show-admin-nav" : ""
        }`}
      ></div>
    </div>
  );
};

export default HamburgerIcon;
