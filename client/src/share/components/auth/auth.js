import React, { useState, useEffect } from "react";

import "./auth.css";

import Button from "../../../share/components/button/button";
import FormInput from "../FormInput/FormInput";
import BackDrop from "../../UI/BackDrop/BackDrop";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";
import Modal from "../../../share/UI/Modal/Modal";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";

const Auth = (props) => {
  const [signUp, setSignUp] = useState(false);
  const [customer, loading, error, fetchData, , setError] = useHttp();

  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });

  const [allValid] = useCheckOverAllValid(loginVals, signUp);

  const changeLoginValHandler = (val, objKey) => {
    setLoginVals({
      ...loginVals,
      [objKey]: val,
    });
  };

  const changeModeHandler = () => {
    setSignUp(!signUp);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newObj = {};
    for (let key in loginVals) {
      newObj[key] = loginVals[key].value;
    }
    const { username, email, password } = newObj;
    if (signUp) {
      fetchData(`${process.env.REACT_APP_BACKEND_URL}/customer`, "post", {
        username,
        password,
        email,
      });
    } else {
      fetchData(`${process.env.REACT_APP_BACKEND_URL}/customer/login`, "post", {
        email,
        password,
      });
    }
    props.toggleLogin();
    for (let key in loginVals) {
      loginVals[key].value = "";
      loginVals[key].isTouched = false;
      loginVals[key].valid = false;
    }
  };

  useEffect(() => {
    customer && props.loginUser(customer.user, customer.token);
  }, [customer]);

  const hideErrorModalHandler = () => {
    setError(false);
  };

  return (
    <>
      <Modal
        modalShow={error}
        title={"Error occured"}
        body={
          <>
            <p style={{ color: "white", marginBottom: "1rem" }}>{error}</p>
            <Button clicked={hideErrorModalHandler}>Cancel</Button>
          </>
        }
      />
      <Spinner show={loading} />
      <BackDrop clicked={props.toggleLogin} backDropShow={props.login} />
      <form
        onSubmit={submitHandler}
        className={`form ${props.login && "show-login"}`}
      >
        {signUp && (
          <FormInput
            id="username"
            label="username"
            errorMsg="This field can't be empty"
            type="text"
            elementType="input"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(e, objKey) => changeLoginValHandler(e, objKey)}
          />
        )}
        <FormInput
          id="email"
          changeLoginVal={(e, objKey) => changeLoginValHandler(e, objKey)}
          validRules={{ type: "REQUIRE" }}
          elementType="input"
          type="text"
          label="email"
          errorMsg="This field can't be empty"
        />
        <FormInput
          id="password"
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
          {signUp ? "Already have an account?" : "Don't have an account?"}
          <Button
            clicked={changeModeHandler}
            type="button"
            className="change-mode__btn"
          >
            {signUp ? "Login" : "Sign Up"}
          </Button>
        </p>
      </form>
    </>
  );
};

export default Auth;
