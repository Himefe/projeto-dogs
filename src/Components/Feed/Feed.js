import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadPhotos, resetState } from "../../Redux/feed";
import { resetState as resetPhotoPost } from "../../Redux/photoPost";
import Loading from "../Helper/Loading";

const Feed = ({ userID }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);

  const { modal } = useSelector((state) => state.uiSlice);
  const { data } = useSelector((state) => state.user);

  const { infinite, loading, list, error } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetState());
    dispatch(resetPhotoPost());
    dispatch(loadPhotos({ total: 6, user: userID }));
  }, [userID, dispatch]);

  React.useEffect(() => {
    let wait = false;
    const infinitePage = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait && infinite) {
          dispatch(loadPhotos({ total: 6, user: userID }));

          wait = true;
          setTimeout(() => {
            wait = false;
          }, 1500);
        }
      }
    };

    window.addEventListener("wheel", infinitePage);
    window.addEventListener("scroll", infinitePage);

    return () => {
      window.removeEventListener("wheel", infinitePage);
      window.removeEventListener("scroll", infinitePage);
    };
  }, [dispatch, infinite, userID]);

  if (error) return <span className="error">{error}</span>;

  return (
    <>
      {modal ? <FeedModal photo={modalPhoto} userID={userID} /> : null}

      <FeedPhotos

      // setInfinite={setInfinite}
      />
      {loading && <Loading />}
    </>
  );
};

Feed.defaultProps = {
  userID: 0,
};

Feed.propTypes = {
  userID: propTypes.oneOfType([
    propTypes.string.isRequired,
    propTypes.number.isRequired,
  ]),
};

export default Feed;
