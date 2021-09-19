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
            label="Username"
            type="text"
            validRules={{ required: true }}
            changeVal={changeLoginValHandler}
            name="username"
          />
        )}
        <FormInput
          changeVal={changeLoginValHandler}
          validRules={{ required: true }}
          type="email"
          label="Email"
          name="email"
        />
        <FormInput
          changeVal={changeLoginValHandler}
          validRules={{ required: true }}
          type="password"
          label="Password"
          name="password"
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
