import React from "react";
import styles from "./css/FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import PhotoContent from "./Photo/PhotoContent";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotoId } from "../../Redux/photo";
import { toggleModal } from "../../Redux/ui";

const FeedModal = ({ photo }) => {
  const { loading, error } = useSelector((state) => state.photoReducer);

  const dispatch = useDispatch();

  const fechaModal = (event) => {
    if (event.currentTarget === event.target) dispatch(toggleModal());
  };

  return (
    <div className={styles.modal} onClick={fechaModal}>
      {error ? <Error error={error} /> : null}
      {loading ? <Loading /> : <PhotoContent />}
    </div>
  );
};

export default FeedModal;
