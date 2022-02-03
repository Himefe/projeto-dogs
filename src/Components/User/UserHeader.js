import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import stylesLogin from "../Login/LoginForms.module.css";
import style from "./css/User.module.css";

import { ReactComponent as Conta } from "../../Assets/feed.svg";
import { ReactComponent as Adicionar } from "../../Assets/adicionar.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as Logout } from "../../Assets/sair.svg";
import useMedia from "../../Hooks/useMedia";

const UserHeader = () => {
  const { userLogout } = React.useContext(UserContext);
  const [title, setTitle] = React.useState("Minha Conta");

  const { pathname } = useLocation();

  React.useEffect(() => {
    let titulo = pathname.replace("/conta/", "");
    let firstLetter = titulo.charAt(0).toUpperCase();

    if (titulo === "minha-conta") {
      setTitle("Minha Conta");
    } else {
      setTitle(firstLetter + titulo.slice(1));
    }
  }, [pathname]);

  const matched = useMedia("(max-width: 767px)");

  const [mobile, setMobile] = React.useState(false);

  return (
    <>
      <div className={style.userArea}>
        <h1 className={stylesLogin.title}>{title}</h1>
        {matched ? (
          <button
            onClick={() => setMobile(!mobile)}
            className={`${style.menuMobile} ${
              mobile ? style.menuMobileActive : ""
            }`}
            aria-label="Menu"
          ></button>
        ) : null}
        <nav
          className={`${matched ? style.navAreaMobile : style.navArea} ${
            mobile ? style.navMobileActive : ""
          }`}
        >
          <NavLink to="minha-conta">
            <Conta />
            {matched ? <p>Minhas Fotos</p> : null}
          </NavLink>
          <NavLink to="estatisticas">
            <Estatisticas />
            {matched ? <p>Estastísticas</p> : null}
          </NavLink>
          <NavLink to="postar">
            <Adicionar />
            {matched ? <p>Adicionar Fotos</p> : null}
          </NavLink>
          <button onClick={userLogout}>
            <Logout />
            {matched ? <p>Sair</p> : null}
          </button>
        </nav>
      </div>
    </>
  );
};

export default UserHeader;
