import React, { useContext } from "react";

import WhilistProduct from "../components/WhilistProduct/WhilistProduct";
import Context from "../../contexts/context";

const WhilistProductPage = (props) => {
  const context = useContext(Context);

  return (
    <>
      <WhilistProduct whilistProduct={context.whilist} />
    </>
  );
};

export default WhilistProductPage;
