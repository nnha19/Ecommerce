import React, { useEffect, useState, useContext } from "react";

import CustomerOrder from "../components/CustomerOrder/CustomerOrder";
import { useHttp } from "../../customHooks/useHttp";
import Context from "../../contexts/context";
import Spinner from "../../share/UI/Spinner/Spinner";

const CustomerOrderPage = (props) => {
  const context = useContext(Context);
  const [
    customerOrder,
    loading,
    error,
    fetchData,
    setCustomerOrder,
    setError,
  ] = useHttp([]);

  //   useEffect(() => {
  //     fetchData(`http://localhost:5000/order/${context.curUser.userId}`);
  //   }, []);
  useEffect(() => {
    if (customerOrder.length === 0) {
      setError("You haven't ordered anything yet.");
      return;
    }
  }, [customerOrder]);
  console.log(error);

  return (
    <>
      <Spinner show={loading} />
      <CustomerOrder error={error} />
    </>
  );
};

export default CustomerOrderPage;
