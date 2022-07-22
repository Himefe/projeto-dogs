import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../Assets/Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";

import { useSelector } from "react-redux";

const Header = () => {
  const { data } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  React.useEffect(() => {
    function scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (pathname === "/") scrollTop();
  });

  return (
    <header className={styles.header}>
      <nav className={styles.navHeader + " container"}>
        <Link to="/" aria-label="Dogs - Home" className={styles.logo}>
          <Dogs />
        </Link>
        {data ? (
          <div style={{ display: "flex" }}>
            <Link to="/conta/minha-conta" className={styles.login}>
              {data.nome}
            </Link>
          </div>
        ) : (
          <Link to="/Login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
