import React from "react";
import { PHOTO_COMMENT_POST } from "../../../api";
import useFetch from "../../../Hooks/useFetch";
import styles from "./css/PhotoCommentForm.module.css";
import { ReactComponent as Enviar } from "../../../Assets/enviar.svg";
import Error from "../../Helper/Error";

const PhotoComment = ({ id, setComments, single }) => {
  const { request, error } = useFetch();

  const [comment, setComment] = React.useState("");

  const sendComment = async (event) => {
    event.preventDefault();
    const { url, options } = PHOTO_COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);

    if (response.ok) {
      setComments((comments) => [...comments, json]);
      setComment("");
    }
  };

  return (
    <form
      onSubmit={sendComment}
      className={`${styles.form} ${single ? styles.single : ""}`}
    >
      <textarea
        type="text"
        placeholder="Digite aqui seu comentário"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        resize="no-resize"
        className={styles.textArea}
      />
      <button className={styles.send}>
        <Enviar />
      </button>
      {error ? <Error error={error} /> : null}
    </form>
  );
};

export default PhotoComment;
