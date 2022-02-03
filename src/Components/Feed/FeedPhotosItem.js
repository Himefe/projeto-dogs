import React from "react";
import Image from "../Helper/Image";

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  const [attAcesso, setAttAcesso] = React.useState(photo.acessos);

  function handleClick() {
    setModalPhoto(photo);
    setAttAcesso(Number(attAcesso) + 1);
  }

  return (
    <li onClick={handleClick}>
      <Image src={photo.src} alt={photo.titulo} />
      <span>{attAcesso}</span>
    </li>
  );
};

export default FeedPhotosItem;
