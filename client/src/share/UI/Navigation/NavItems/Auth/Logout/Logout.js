import React, { useContext } from "react";

import Context from "../../../../../../contexts/context";

const Login = (props) => {
  const logout = useContext(Context).logout;

  return (
    <li className="login">
      <button onClick={logout} className="login__btn">
        Logout
      </button>
    </li>
  );
};

export default Login;
