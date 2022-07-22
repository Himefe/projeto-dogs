import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Image from "../../Helper/Image";
import ButtonDelete from "./ButtonDelete";
import styles from "./css/PhotoContent.module.css";
import PhotoComments from "./PhotoComments";

const PhotoContent = ({ single }) => {
  const photoState = useSelector((state) => state.photoReducer);
  const user = useSelector((state) => state.user);

  if (photoState.data) {
    const { photo, comments } = photoState?.data;
    return (
      <div className={`${styles.modalPhoto} ${single ? styles.single : ""}`}>
        <div className={styles.imgContent}>
          <Image alt={photo?.title} src={photo?.src} />
        </div>
        <div className={styles.contentComment}>
          <div className={styles.container}>
            <p className={styles.author}>
              {photo?.author !== user.data?.nome ? (
                <Link to={`/perfil/${photo?.author}`}>@{photo?.author}</Link>
              ) : (
                <ButtonDelete id={photo?.id} />
              )}

              <span>{photo?.acessos}</span>
            </p>
            <h1 className="title">
              <Link to={`/foto/${photo?.id}`}>{photo?.title}</Link>
            </h1>
            <div className={styles.atributos}>
              <span>{photo.peso} Kg</span>
              <span>{photo.idade} anos</span>
            </div>
          </div>
          <PhotoComments comments={comments} id={photo.id} single={single} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PhotoContent;
