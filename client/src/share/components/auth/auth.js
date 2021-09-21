import React, { useState, useEffect } from "react";

import "./auth.css";

import Button from "../../../share/components/button/button";
import FormInput from "../FormInput/FormInput";
import BackDrop from "../../UI/BackDrop/BackDrop";
import { useHttp } from "../../../customHooks/useHttp";
import Spinner from "../../../share/UI/Spinner/Spinner";
import Modal from "../../../share/UI/Modal/Modal";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";

const Auth = (props) => {
  const [signUp, setSignUp] = useState(false);
  const [customer, loading, error, fetchData, , setError] = useHttp();

  const [loginVals, setLoginVals] = useState({
    email: { value: "", error: true },
    password: { value: "", error: true },
    username: { value: "", error: true },
  });
  const [allValid] = useCheckOverAllValid(loginVals, signUp);

  const changeLoginValHandler = (e, error) => {
    const { name, value } = e.target;
    const update = { ...loginVals[name], value, error };
    setLoginVals({
      ...loginVals,
      [name]: update,
    });
  };

  const changeModeHandler = () => {
    const updatedLoginVals = { ...loginVals };
    if (!signUp) {
      updatedLoginVals.username = { value: "", error: true };
    }
    Object.keys(updatedLoginVals).map((key) => {
      updatedLoginVals[key].value = "";
      updatedLoginVals[key].error = true;
    });
    setLoginVals(updatedLoginVals);
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
        className={`auth__form ${props.login && "show-login"}`}
      >
        <i onClick={props.toggleLogin} className="hide-form fas fa-times"></i>
        {signUp && (
          <FormInput
            inputContainerCls="auth-input-container"
            inputClsName="auth-form__input"
            label="Username"
            type="text"
            validRules={{ required: true }}
            changeVal={changeLoginValHandler}
            name="username"
            placeholder="Your Name"
            value={loginVals["username"].value}
          />
        )}
        <FormInput
          inputContainerCls="auth-input-container"
          inputClsName="auth-form__input"
          changeVal={changeLoginValHandler}
          validRules={{ required: true }}
          type="email"
          label="Email"
          name="email"
          placeholder="Your Email"
          value={loginVals["email"].value}
        />
        <FormInput
          inputContainerCls="auth-input-container"
          inputClsName="auth-form__input"
          changeVal={changeLoginValHandler}
          validRules={{ required: true }}
          type="password"
          label="Password"
          name="password"
          placeholder="Your Password"
          value={loginVals["password"].value}
        />

        <SecondaryBtn disabled={!allValid} className="form__btn">
          Submit
        </SecondaryBtn>
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
