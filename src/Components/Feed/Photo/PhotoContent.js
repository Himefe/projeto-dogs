import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import Image from "../../Helper/Image";
import ButtonDelete from "./ButtonDelete";
import styles from "./css/PhotoContent.module.css";
import PhotoComments from "./PhotoComments";

const PhotoContent = ({ data, single }) => {
  console.log(data);
  const { photo, comments } = data;
  const user = React.useContext(UserContext);

  return (
    <div className={`${styles.modalPhoto} ${single ? styles.single : ""}`}>
      <div className={styles.imgContent}>
        <Image alt={photo.title} src={photo.src} />
      </div>
      <div className={styles.contentComment}>
        <div className={styles.container}>
          <p className={styles.author}>
            {photo.author !== user.data?.nome ? (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            ) : (
              <ButtonDelete id={photo.id} />
            )}

            <span>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
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
};

export default PhotoContent;
