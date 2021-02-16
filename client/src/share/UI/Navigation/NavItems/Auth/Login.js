import React, { useState } from "react";

import "./Login.css";

import BackDrop from "../../../BackDrop/BackDrop";
import FormInput from "../../../../components/FormInput/FormInput";
import Button from "../../../../../share/components/button/button";

const Login = (props) => {
  const [login, setLogin] = useState(false);

  const hideLogin = () => {
    setLogin(false);
  };

  return (
    <>
      <BackDrop clicked={hideLogin} backDropShow={login} />
      <li className="login">
        <button onClick={() => setLogin(true)} className="login__btn">
          Login
        </button>
      </li>
      <form className={`form ${login && "show-login"}`}>
        <FormInput elementType="input" type="text" label="email" />
        <FormInput elementType="input" type="password" label="password" />
        <Button className="form__btn">Submit</Button>
      </form>
    </>
  );
};

export default Login;
