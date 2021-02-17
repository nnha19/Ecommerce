import React, { useContext } from "react";

import "./Login.css";

import Context from "../../../../../contexts/context";

const Login = (props) => {
  const toggleLogin = useContext(Context).toggleLogin;

  return (
    <li className="login">
      <button onClick={toggleLogin} className="login__btn">
        Login
      </button>
    </li>
  );
};

export default Login;
