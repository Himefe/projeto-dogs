import React from "react";
import { PHOTOS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "./FeedPhotosItem";
import styles from "./css/FeedPhotos.module.css";
import Loading from "../Helper/Loading";
import { useSelector } from "react-redux";

const FeedPhotos = ({ setModalPhoto }) => {
  const { list, data, error, loading } = useSelector((state) => state.feed);
  const { modal } = useSelector((state) => state.uiSlice);

  if (list.length) {
    return (
      <>
        <ul className={styles.ulArea}>
          {list.map((photo) => (
            <FeedPhotosItem
              photo={photo}
              key={photo.id}
              setModalPhoto={setModalPhoto}
            />
          ))}
        </ul>
        {data.length <= 1 ? (
          <p
            style={{
              textAlign: "center",
              padding: "2rem 0px 4rem",
              color: "rgb(136, 136, 136)",
            }}
          >
            Não existem mais postagens!
          </p>
        ) : null}
      </>
    );
  } else {
    return null;
  }
};

export default FeedPhotos;
