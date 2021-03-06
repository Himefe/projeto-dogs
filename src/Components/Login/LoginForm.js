import React from "react";
import useForm from "../../Hooks/useForm";
import Button from "../Form/Button";
import Input from "../Form/Input";
import styles from "./LoginForms.module.css";
import stylesButton from "../Form/Button.module.css";
import Error from "../Helper/Error";

import { Link } from "react-router-dom";

import Head from "../Helper/Head";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/user";

const LoginForm = () => {
  const { loading, error } = useSelector((state) => state.user); // Selector reducer: user;

  const dispatch = useDispatch();

  const username = useForm("");
  const password = useForm("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    username.validate();
    password.validate();

    if (username.validate() && password.validate()) {
      dispatch(
        userLogin({ username: username.value, password: password.value })
      );
    }
  };

  return (
    <section className={styles.loginForm + " animeLeft"}>
      <Head
        title="Login"
        description="Esta é a página de login do usuário, no projeto dogs!"
      />
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Usuário"
          type="text"
          id="usuario"
          name="usuario"
          {...username}
        />
        <Input
          label="Senha"
          type="password"
          id="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button nome="Carregando..." disabled />
        ) : (
          <Button nome="Entrar" />
        )}

        {error ? <Error error={error.payload} /> : null}
      </form>

      <Link to="perdeu" className={styles.lostPassword}>
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesButton.button} to="./cadastro">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
