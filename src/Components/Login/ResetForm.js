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
  const { loading, error, request, data, setError } = useFetch();

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
      const { response, json } = await request(url, options);

      if (response.ok) {
        setTimeout(() => {
          navigate("/Login");
        }, 4000);
      } else {
        setError(json.message);
      }
    }
  }

  return (
    <div className={`${styles.loginForm} animeLeft`}>
      <h2 className="title">Reset de senha</h2>
      {data && typeof data === "string" ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Senha" type="password" {...password} />
          {loading ? (
            <Button nome="Resetando..." disabled />
          ) : (
            <Button nome="Resetar" />
          )}

          {error ? <Error error={error} /> : null}

          {data && typeof data !== "string" ? (
            <Error error={data?.message} />
          ) : null}
        </form>
      )}
    </div>
  );
};

export default ResetForm;
