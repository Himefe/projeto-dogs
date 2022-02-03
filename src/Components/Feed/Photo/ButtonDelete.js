import React from "react";
import { PHOTO_DELETE } from "../../../api";
import useFetch from "../../../Hooks/useFetch";
import Error from "../../Helper/Error";
import styles from "./css/ButtonDelete.module.css";

const ButtonDelete = ({ id }) => {
  const { request, loading, error } = useFetch();

  async function handleDelete() {
    const confirm = window.confirm("Deseja realmente deletar esta foto?");

    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  if (error) return <Error error={error} />;
  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletar
        </button>
      ) : (
        <button onClick={handleDelete} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default ButtonDelete;
