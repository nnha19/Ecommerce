import React, { useContext } from "react";
import Context from "../../../contexts/context";

const Admin = ({ children }) => {
  const { curUser } = useContext(Context);
  return curUser && curUser.admin ? children : null;
};
export default Admin;
