import React from "react";
import { PHOTOS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "./FeedPhotosItem";
import styles from "./css/FeedPhotos.module.css";
import Loading from "../Helper/Loading";

const FeedPhotos = ({ setModalPhoto, userID, pages, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  const [noMore, setNoMore] = React.useState(false);

  React.useEffect(() => {
    const fetchPhotos = async () => {
      let total = 6;
      const { url, options } = PHOTOS_GET({
        page: pages,
        total,
        user: await userID,
      });

      const { response, json } = await request(url, options);
      if (json && response.ok && json.length < total) {
        setInfinite(false);
        setNoMore(true);
      }
    };

    fetchPhotos();
  }, [request, userID, pages, setInfinite]);

  if (error) return <span className="error">{error}</span>;
  if (loading) return <Loading />;
  if (data) {
    return (
      <>
        <ul className={styles.ulArea}>
          {data.map((photo) => (
            <FeedPhotosItem
              photo={photo}
              key={photo.id}
              setModalPhoto={setModalPhoto}
            />
          ))}
        </ul>
        {noMore ? (
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
