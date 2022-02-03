import React from "react";
import { useParams } from "react-router-dom";
import Head from "../../Helper/Head";
import Feed from "../Feed";

const Perfil = () => {
  const { author } = useParams();

  return (
    <section className="container mainContainer">
      <Head title={author} />
      <h1 className="title" style={{ textTransform: "capitalize" }}>
        {author}
      </h1>
      <Feed userID={author} />
    </section>
  );
};

export default Perfil;
