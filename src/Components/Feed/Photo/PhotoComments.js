import React from "react";
import { UserContext } from "../../../UserContext";
import styles from "./css/PhotoComment.module.css";
import PhotoCommentForm from "./PhotoCommentForm";

const PhotoComments = (props) => {
  const { login } = React.useContext(UserContext);
  const [comments, setComments] = React.useState(props.comments);

  return (
    <>
      <div className={styles.container}>
        <ul
          className={`${styles.comentariosArea} ${
            props.single ? styles.single : ""
          }`}
        >
          {props.comments &&
            comments.map((comment) => (
              <li key={comment?.comment_ID} className={styles.comentarios}>
                <strong>{`${comment?.comment_author}: `}</strong>
                <p>{comment?.comment_content}</p>
              </li>
            ))}
        </ul>
      </div>
      {login ? (
        <PhotoCommentForm
          setComments={setComments}
          id={props.id}
          single={props.single}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PhotoComments;
