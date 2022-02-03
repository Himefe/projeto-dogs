import React from "react";
import { USER_LOGIN_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Form/Button";
import Input from "../Form/Input";
import styles from "./LoginForms.module.css";

const ResetForm = () => {
  const password = useForm("");
  const { loading, error, request, data } = useFetch();

  const [key, setKey] = React.useState(null);
  const [login, setLogin] = React.useState(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chave = params.get("key");
    const loginParam = params.get("login");

    if (chave) setKey(chave);
    if (loginParam) setLogin(loginParam);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    password.validate();
    if (password.validate()) {
      const obj = {
        key,
        login,
        password: password.value,
      };
      const { url, options } = USER_LOGIN_RESET(obj);
      await request(url, options);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <form className={`${styles.loginForm} animeLeft`} onSubmit={handleSubmit}>
        <h2 className="title">Reset de senha</h2>
        <Input label="Senha" type="password" {...password} />
        <Button nome="Resetar" />
        {data ? <p className={styles.sucess}>{data}</p> : null}
      </form>
    </>
  );
};

export default ResetForm;
