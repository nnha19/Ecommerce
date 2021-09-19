import { useHttp } from "./useHttp";

export const useCreateProduct = (value, token, fetchData) => {
  fetchData(
    `${process.env.REACT_APP_BACKEND_URL}/products`,
    "post",
    value,
    token
  );
  // history.push("/");
};
