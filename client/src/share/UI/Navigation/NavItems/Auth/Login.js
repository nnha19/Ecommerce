import React, { useEffect, useState } from "react";

import "./Login.css";

import BackDrop from "../../../BackDrop/BackDrop";
import FormInput from "../../../../components/FormInput/FormInput";
import Button from "../../../../../share/components/button/button";

const Login = (props) => {
  const [login, setLogin] = useState(false);

  const [allValid, setAllValid] = useState(false);
  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const valids = [];
    for (let key in loginVals) {
      valids.push(loginVals[key].valid);
    }
    valids.every((v) => v) ? setAllValid(true) : setAllValid(false);
  }, [loginVals]);

  const changeLoginValHandler = (val, objKey) => {
    setLoginVals({
      ...loginVals,
      [objKey]: val,
    });
  };

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
        <FormInput
          changeLoginVal={(e, objKey) => changeLoginValHandler(e, objKey)}
          validRules={{ type: "REQUIRE" }}
          elementType="input"
          type="text"
          label="email"
          errorMsg="This field can't be empty"
        />
        <FormInput
          changeLoginVal={(e, objKey) => changeLoginValHandler(e, objKey)}
          validRules={{ type: "MIN_LENGTH", amount: 5 }}
          elementType="input"
          type="password"
          label="password"
          errorMsg="at least 6 characters"
        />
        <Button disabled={!allValid} className="form__btn">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
