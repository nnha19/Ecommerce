import React, { useContext } from "react";

import "./Logout.css";

import Context from "../../../../../../contexts/context";

const Login = ({ className }) => {
  const logout = useContext(Context).logout;

  return (
    <li className={`logout customer__list ${className}`}>
      <button onClick={logout} className="logout__btn">
        Logout
      </button>
    </li>
  );
};

export default Login;
