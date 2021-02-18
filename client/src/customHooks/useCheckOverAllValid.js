import { useState, useEffect } from "react";
const useCheckOverAllValid = (obj) => {
  const [allValid, setAllValid] = useState(false);
  useEffect(() => {
    const overallValid = [];
    for (let key in obj) {
      overallValid.push(obj[key].valid);
    }
    console.log(obj);
    setAllValid(overallValid.every((valid) => valid));
  }, [obj]);
  return [allValid];
};

export default useCheckOverAllValid;
