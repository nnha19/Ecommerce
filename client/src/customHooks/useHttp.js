import { useState } from "react";

import axios from "axios";

export const useHttp = (initVal, url, method) => {
  const [respData, setRespData] = useState(initVal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method, data) => {
    try {
      setLoading(true);
      const resp = await axios({
        url,
        method,
        data,
      });
      if (resp.data.length === 0) {
        setError("No items in the cart.");
        setLoading(false);
        return;
      }
      setRespData(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      setLoading(false);
    }
  };
  return [respData, loading, error, fetchData, setRespData, setError];
};
