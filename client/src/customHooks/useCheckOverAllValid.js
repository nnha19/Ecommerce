import { useState, useEffect } from "react";

const useCheckOverAllValid = (obj, mode) => {
  const [allValid, setAllValid] = useState(false);
  useEffect(() => {
    !mode && delete obj.username;
    const overallValid = [];
    for (let key in obj) {
      overallValid.push(obj[key].valid);
    }
    setAllValid(overallValid.every((valid) => valid));
  }, [obj, mode]);

  return [allValid];
};

export default useCheckOverAllValid;
