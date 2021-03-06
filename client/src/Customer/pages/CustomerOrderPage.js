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

  useEffect(() => {
    context.curUser &&
      fetchData(
        `${process.env.REACT_APP_BACKEND_URL}/order/${context.curUser.userId}`
      );
  }, [context.curUser]);

  useEffect(() => {
    if (customerOrder.length === 0) {
      setError("You haven't ordered anything yet.");
    } else {
      setError(null);
    }
  }, [customerOrder]);

  return (
    <>
      <Spinner show={loading} />
      <CustomerOrder order={customerOrder} error={error} />
    </>
  );
};

export default CustomerOrderPage;
