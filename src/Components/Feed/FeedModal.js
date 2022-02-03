import React from "react";
import styles from "./css/FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import PhotoContent from "./Photo/PhotoContent";
import Loading from "../Helper/Loading";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const pegarFoto = async () => {
      const { url, options } = PHOTO_GET(photo.id);
      await request(url, options);

      return;
    };
    pegarFoto();
  }, [photo, request]);

  const fechaModal = (event) => {
    if (event.currentTarget === event.target) setModalPhoto(null);
  };

  return (
    <div className={styles.modal} onClick={fechaModal}>
      {error ? <p>{error}</p> : null}
      {loading ? <Loading /> : null}
      {data ? <PhotoContent data={data} /> : null}
    </div>
  );
};

export default FeedModal;
