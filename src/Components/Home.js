import React from "react";
import Feed from "./Feed/Feed";
import Head from "./Helper/Head";

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head
        title="Home"
        description="Esta é a pagína incial do projeto dogs!"
      />
      <Feed />
    </section>
  );
};

export default Home;
