import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPhotoId } from "../../../Redux/photo";
import Loading from "../../Helper/Loading";

import PhotoContent from "./PhotoContent";

const Photo = () => {
  const dispatch = useDispatch();
  const statePhoto = useSelector((state) => state.photoReducer);

  const { id } = useParams();

  React.useEffect(() => {
    const aloha = async () => {
      if (id) {
        dispatch(fetchPhotoId(id));
      }
    };
    aloha();
  }, [id, dispatch]);

  if (statePhoto.loading) return <Loading />;
  return (
    <div className="mainContainer container">
      {statePhoto.data ? <PhotoContent single={true} /> : null}
    </div>
  );
};

export default Photo;
