import React from "react";
import styles from "./css/Image.module.css";

const Image = (props) => {
  const [skeleton, setSkeleton] = React.useState(true);

  const showImage = ({ target }) => {
    target.style.opacity = 1;
    setSkeleton(false);
  };

  return (
    <div className={styles.wrapper}>
      {skeleton ? <div className={styles.skeleton}></div> : null}
      <img
        alt={props.alt}
        src={props.src}
        {...props}
        className={styles.img}
        onLoad={showImage}
      />
    </div>
  );
};

export default Image;
