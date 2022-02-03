import React from "react";
import { Route, Routes } from "react-router-dom";

import AdicionarFoto from "./AdicionarFoto";
import Estatisticas from "./Estatisticas";
import Profile from "./Profile";
import UserHeader from "./UserHeader";

const User = () => {
  return (
    <>
      <section className="container mainContainer">
        <UserHeader />
        <Routes>
          <Route path="/minha-conta" element={<Profile />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/postar" element={<AdicionarFoto />} />
        </Routes>
      </section>
    </>
  );
};

export default User;
