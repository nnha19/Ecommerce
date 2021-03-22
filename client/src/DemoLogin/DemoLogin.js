import React from "react";

import "./DemoLogin.css";

const DemoLogin = (props) => {
  return (
    <div className="demo">
      <button className="demo__login">
        Demo <i class="demo__icon fas fa-angle-down"></i>
      </button>
      <ul className="demo__lists">
        <li className="demo__list">Login As Admin</li>
        <li className="demo__list">Login As User</li>
      </ul>
    </div>
  );
};

export default DemoLogin;
