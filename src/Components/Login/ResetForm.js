import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Error from "../Helper/Error";
import styles from "./LoginForms.module.css";

const ResetForm = () => {
  const password = useForm("");
  const { loading, error, request, data } = useFetch();

  const [key, setKey] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const navigate = useNavigate();

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
      setTimeout(() => {
        navigate("./Login");
      }, 4000);
    }
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="animeLeft">
      <h2 className="title">Reset de senha</h2>
      {typeof data === "string" ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input label="Senha" type="password" {...password} />
          {loading ? (
            <Button nome="Resetando..." disabled />
          ) : (
            <Button nome="Resetar" />
          )}

          {data ? <p className={styles.sucess}>{data}</p> : null}
        </form>
      )}
    </div>
  );
};

export default ResetForm;
