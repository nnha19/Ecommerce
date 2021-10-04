import React, { useContext } from "react";

import "./Login.css";

import Context from "../../../../../contexts/context";

const Login = ({ className }) => {
  const toggleLogin = useContext(Context).toggleLogin;

  return (
    <li className={`login`}>
      <button onClick={toggleLogin} className={`login__btn ${className}`}>
        Login
      </button>
    </li>
  );
};

export default Login;
