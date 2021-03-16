import React, { useEffect, useContext } from "react";

import AllCoupons from "../components/AllCoupons/AllCoupons";
import { useHttp } from "../../customHooks/useHttp";
import Context from "../../contexts/context";
import Spinner from "../../share/UI/Spinner/Spinner";

const AllCouponsPage = (props) => {
  const context = useContext(Context);

  const [
    allCoupons,
    loading,
    error,
    fetchData,
    setAllCoupons,
    setError,
  ] = useHttp([]);

  useEffect(() => {
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/coupon`,
      "get",
      "",
      context.token
    );
  }, []);

  return (
    <>
      <Spinner show={loading} />
      <AllCoupons coupons={allCoupons} />
    </>
  );
};

export default AllCouponsPage;
