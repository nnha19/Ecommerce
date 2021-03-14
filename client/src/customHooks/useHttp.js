import { useState, useContext } from "react";

import axios from "axios";

import Context from "../contexts/context";

export const useHttp = (initVal, url, method) => {
  const context = useContext(Context);
  const token = context && context.curUser && context.token;

  const [respData, setRespData] = useState(initVal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method, data, token) => {
    console.log(data);
    try {
      setLoading(true);
      const resp = await axios({
        url,
        method,
        data,
        headers: {
          Authorization: token,
        },
      });
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
