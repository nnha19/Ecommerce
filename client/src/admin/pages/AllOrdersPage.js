import React, { useEffect, useContext } from "react";

import CustomerOrder from "../../Customer/components/CustomerOrder/CustomerOrder";
import { useHttp } from "../../customHooks/useHttp";
import Spinner from "../../share/UI/Spinner/Spinner";
import Context from "../../contexts/context";

const AllOrdersPage = (props) => {
  const context = useContext(Context);
  const [
    allOrders,
    loading,
    error,
    fetchData,
    setAllOrders,
    setError,
  ] = useHttp([]);

  useEffect(() => {
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/order/${context.curUser.userId}/admin`,
      "get",
      "",
      context.token
    );
  }, []);

  return (
    <>
      <Spinner show={loading} />
      <CustomerOrder order={allOrders} error={error} />
    </>
  );
};
export default AllOrdersPage;
