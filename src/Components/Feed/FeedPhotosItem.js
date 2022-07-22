import React from "react";
import { useDispatch } from "react-redux";
import { fetchPhotoId } from "../../Redux/photo";
import { toggleModal } from "../../Redux/ui";
import Image from "../Helper/Image";

const FeedPhotosItem = ({ photo }) => {
  const [attAcesso, setAttAcesso] = React.useState(photo.acessos);

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleModal());
    dispatch(fetchPhotoId(photo.id));
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
