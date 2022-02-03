import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import propTypes from "prop-types";

const Feed = ({ userID }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    const infinitePage = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll === height && wait === false) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 1500);
        }
      }
    };

    // window.addEventListener("wheel", infinitePage);
    window.addEventListener("scroll", infinitePage);

    return () => {
      // window.removeEventListener("wheel", infinitePage);
      window.removeEventListener("scroll", infinitePage);
    };
  }, [infinite]);

  return (
    <>
      {modalPhoto ? (
        <FeedModal
          photo={modalPhoto}
          setModalPhoto={setModalPhoto}
          userID={userID}
        />
      ) : null}

      {pages.map((page) => (
        <FeedPhotos
          key={page}
          setModalPhoto={setModalPhoto}
          userID={userID}
          pages={page}
          setInfinite={setInfinite}
        />
      ))}
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
