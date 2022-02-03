import React from "react";
import { useParams } from "react-router-dom";
import { PHOTO_GET } from "../../../api";
import useFetch from "../../../Hooks/useFetch";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const aloha = async () => {
      const { url, options } = PHOTO_GET(id);
      await request(url, options);

      return;
    };
    aloha();
  }, [request, id]);

  return (
    <div className="mainContainer container">
      {data ? <PhotoContent data={data} single={true} /> : null}
    </div>
  );
};

export default Photo;
