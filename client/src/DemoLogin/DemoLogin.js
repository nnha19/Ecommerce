import React, { useEffect } from "react";

import "./DemoLogin.css";

import { useHttp } from "../customHooks/useHttp";
import Spinner from "../share/UI/Spinner/Spinner";

const DemoLogin = (props) => {
  const [
    customer,
    loading,
    error,
    fetchData,
    setAdminData,
    setError,
  ] = useHttp();

  const loginAsAdminHandler = (type) => {
    if (type === "admin") {
      fetchData(`${process.env.REACT_APP_BACKEND_URL}/customer/login`, "post", {
        email: "email",
        password: "password",
      });
    } else {
      fetchData(`${process.env.REACT_APP_BACKEND_URL}/customer/login`, "post", {
        email: "nyinyi",
        password: "password",
      });
    }
  };

  useEffect(() => {
    customer && props.loginUser(customer.user, customer.token);
  }, [customer]);

  return (
    <>
      <Spinner show={loading} />
      <div className="demo">
        <button className="demo__login">
          Demo <i class="demo__icon fas fa-angle-down"></i>
        </button>
        <ul className="demo__lists">
          <li
            onClick={() => loginAsAdminHandler("admin")}
            className="demo__list"
          >
            Login As Admin
          </li>
          <li onClick={loginAsAdminHandler} className="demo__list">
            Login As User
          </li>
        </ul>
      </div>
    </>
  );
};

export default DemoLogin;
