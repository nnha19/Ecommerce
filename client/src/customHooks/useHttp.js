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
      setRespData(resp.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data);
      setLoading(false);
    }
  };
  return [respData, loading, error, fetchData, setRespData];
};
