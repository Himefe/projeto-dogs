import React from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../../UserContext";
import styles from "./css/PhotoComment.module.css";
import PhotoCommentForm from "./PhotoCommentForm";

const PhotoComments = (props) => {
  const user = useSelector((state) => state.user);
  const [comments, setComments] = React.useState(props.comments);

  React.useEffect(() => {
    setComments(props.comments);
  }, [props]);

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
      {user.data ? (
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
