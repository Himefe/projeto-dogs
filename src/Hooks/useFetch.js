import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [login, setLogin] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();

      if (response.ok) {
        if (typeof json === "string") {
          setData(json);
          setLogin(false);
        } else {
          setData(json);
          setLogin(true);
        }
      }
    } catch (err) {
      setError("Houve algum erro!");
      setData(null);
    } finally {
      setLoading(false);
    }
    return {
      response,
      json,
    };
  }, []);

  return {
    data,
    loading,
    error,
    request,
    setData,
    setLoading,
    setError,
    login,
    setLogin,
  };
};

export default useFetch;
