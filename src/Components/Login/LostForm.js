import React from "react";
import { USER_LOST_PASSWORD } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Head from "../Helper/Head";
import styles from "./LoginForms.module.css";
import Error from "../Helper/Error";

const LostForm = () => {
  const { data, setData, request, error, loading } = useFetch();
  const email_usuario = useForm();

  async function handleSubmit(event) {
    event.preventDefault();
    email_usuario.validate();
    if (email_usuario.validate()) {
      const { url, options } = USER_LOST_PASSWORD({
        login: email_usuario.value,
        url: `https://projeto-dogs-himefe.vercel.app/Login/reset`,
      });
      const { json } = await request(url, options);
      setData(json);
    }
  }

  return (
    <section className={styles.loginForm}>
      <Head
        title="Perdeu a senha"
        description="Esta é a página de recuperação de senha do usuário, no projeto dogs!"
      />
      <div className="animeLeft">
        <h1 className={styles.title}>Perdeu a senha?</h1>
        {typeof data === "string" ? (
          <p style={{ color: "#4c1" }}>{data}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="Email / Usuário"
              type="text"
              name="login"
              {...email_usuario}
            />
            {loading ? (
              <Button nome="Enviando..." disabled />
            ) : (
              <Button nome="Enviar Email" />
            )}
          </form>
        )}
        <Error error={typeof data !== "string" ? data?.message : error} />
      </div>
    </section>
  );
};

export default LostForm;
