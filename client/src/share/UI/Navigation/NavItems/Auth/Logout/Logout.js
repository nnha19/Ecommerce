import React, { useContext } from "react";

import "./Logout.css";

import Context from "../../../../../../contexts/context";

const Login = (props) => {
  const logout = useContext(Context).logout;

  return (
    <li className="logout customer__list">
      <button onClick={logout} className="logout__btn">
        Logout
      </button>
    </li>
  );
};

export default Login;
