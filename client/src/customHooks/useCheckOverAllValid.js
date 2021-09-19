import { useState, useEffect } from "react";

const useCheckOverAllValid = (obj, mode) => {
  const [allValid, setAllValid] = useState(false);
  useEffect(() => {
    !mode && delete obj.username;
    const overallValid = [];
    for (let key in obj) {
      overallValid.push(obj[key].error);
    }
    console.log(overallValid);
    setAllValid(!overallValid.some((err) => err));
  }, [obj, mode]);

  return [allValid];
};

export default useCheckOverAllValid;
