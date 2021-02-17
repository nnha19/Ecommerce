import React, { useState, useEffect } from "react";

import Button from "../../../share/components/button/button";
import FormInput from "../FormInput/FormInput";
import BackDrop from "../../UI/BackDrop/BackDrop";

const Auth = (props) => {
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

  return (
    <>
      <BackDrop clicked={props.toggleLogin} backDropShow={props.login} />
      <form className={`form ${props.login && "show-login"}`}>
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
        <p className="change-mode">
          Don't have an account?
          <Button type="button" className="change-mode__btn">
            Sign in
          </Button>
        </p>
      </form>
    </>
  );
};

export default Auth;
