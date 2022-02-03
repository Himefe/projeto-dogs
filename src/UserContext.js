import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GET_USER,
  TOKEN_POST,
  TOKEN_VALIDATE_POST,
  USER_LOST_PASSWORD,
} from "./api";
import useFetch from "./Hooks/useFetch";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [userID, setUserID] = React.useState(null);
  const navigate = useNavigate();
  const {
    data,
    loading,
    error,
    request,
    setData,
    setError,
    setLoading,
    login,
    setLogin,
  } = useFetch();
  React.useEffect(() => {
    async function autoLogin() {
      const tokenLocal = window.localStorage.getItem("token");
      if (tokenLocal) {
        const { url, options } = TOKEN_VALIDATE_POST(tokenLocal);
        const { response } = await request(url, options);
        if (!response.ok) {
          navigate("/login");
        }
        await getUser(tokenLocal);
      }
    }
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUser(token) {
    const { url, options } = GET_USER(token);
    const { json } = await request(url, options);
    setUserID(json.id);
  }

  function userLogout() {
    window.localStorage.removeItem("token");
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    navigate("/login");
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });

    const { json, response } = await request(url, options);
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
    } else {
      setError(json.data.message);
    }
    await getUser(json.token);
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        getUser,
        data,
        loading,
        error,
        userLogout,
        login,
        userID,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
