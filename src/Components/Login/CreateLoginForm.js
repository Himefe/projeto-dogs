import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_POST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Head from "../Helper/Head";
import styles from "./LoginForms.module.css";

const CreateLoginForm = () => {
  const usuario = useForm("");
  const email = useForm("email");
  const password = useForm();

  const navigate = useNavigate();

  const { request, error, setError, loading } = useFetch();

  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    usuario.validate();
    email.validate();
    password.validate();

    const { url, options } = USER_POST({
      username: usuario.value,
      email: email.value,
      password: password.value,
    });

    if (usuario.validate() && email.validate() && password.validate()) {
      const { response, json } = await request(url, options);

      if (response.ok && typeof json === "number") {
        userLogin(usuario.value, password.value);
        navigate("/conta");
      } else {
        setError(json.message);
      }
    }
  }

  return (
    <section className={styles.loginForm}>
      <Head
        title="Cadastrar"
        description="Esta é a página de criação login do usuário, no projeto dogs!"
      />
      <div className="animeLeft">
        <h1 className={styles.title}>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Usuário"
            type="text"
            name="usuario"
            id="usuario"
            {...usuario}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            id="email"
            {...email}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            id="password"
            {...password}
          />
          {loading ? (
            <Button nome="Cadastrando..." disabled />
          ) : (
            <Button nome="Cadastrar" />
          )}

          {error ? <p className={styles.error}>{error}</p> : null}
        </form>
      </div>
    </section>
  );
};

export default CreateLoginForm;
