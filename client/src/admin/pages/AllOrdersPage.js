import React, { useEffect, useContext } from "react";

import CustomerOrder from "../../Customer/components/CustomerOrder/CustomerOrder";
import { useHttp } from "../../customHooks/useHttp";
import Spinner from "../../share/UI/Spinner/Spinner";
import Context from "../../contexts/context";

const AllOrdersPage = (props) => {
  const context = useContext(Context);
  console.log(context);
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
      `http://localhost:5000/order/${context.curUser.userId}/admin`,
      "get"
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
