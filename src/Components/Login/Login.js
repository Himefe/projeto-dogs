import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "../Login/LoginForm";
import CreateLoginForm from "../Login/CreateLoginForm";
import LostForm from "../Login/LostForm";
import ResetForm from "../Login/ResetForm";
import styles from "./Login.module.css";

import { useSelector } from "react-redux";

const Login = () => {
  const user = useSelector((state) => state.user.data);
  if (user) {
    return <Navigate to="/conta/minha-conta" />;
  } else {
    return (
      <section className={styles.login}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="cadastro" element={<CreateLoginForm />} />
          <Route path="perdeu" element={<LostForm />} />
          <Route path="reset" element={<ResetForm />} />
        </Routes>
      </section>
    );
  }
};

export default Login;
