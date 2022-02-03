import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "../Login/LoginForm";
import CreateLoginForm from "../Login/CreateLoginForm";
import LostForm from "../Login/LostForm";
import ResetForm from "../Login/ResetForm";
import styles from "./Login.module.css";
import { UserContext } from "../../UserContext";

const Login = () => {
  const { login } = React.useContext(UserContext);
  if (login) {
    return <Navigate to="/conta/minha-conta" />;
  }
  return (
    <section className={`${styles.login} container mainContainer`}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="cadastro" element={<CreateLoginForm />} />
        <Route path="perdeu" element={<LostForm />} />
        <Route path="reset" element={<ResetForm />} />
      </Routes>
    </section>
  );
};

export default Login;
