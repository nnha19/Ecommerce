import React, { useContext } from "react";

import WhilistProduct from "../components/WhilistProduct/WhilistProduct";
import Context from "../../contexts/context";

const WhilistProductPage = (props) => {
  const { whilist } = useContext(Context);

  return whilist && whilist.length > 0 ? (
    <WhilistProduct whilistProduct={whilist} />
  ) : (
    <div className="error-container">
      <p className="error">No whilistd products.</p>
    </div>
  );
};

export default WhilistProductPage;
