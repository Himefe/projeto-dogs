import React from "react";
import useForm from "../../Hooks/useForm";
import Button from "../Form/Button";
import Input from "../Form/Input";
import styles from "./LoginForms.module.css";
import stylesButton from "../Form/Button.module.css";
import Error from "../Helper/Error";

import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Head from "../Helper/Head";

const LoginForm = () => {
  const { userLogin, loading, error } = React.useContext(UserContext);

  const username = useForm("");
  const password = useForm("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    username.validate();
    password.validate();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
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

        {error ? <Error error={error} /> : null}
      </form>

      <a href="Login/perdeu" className={styles.lostPassword}>
        Perdeu a Senha?
      </a>
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
