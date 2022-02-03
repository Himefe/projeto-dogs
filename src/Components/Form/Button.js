import React from "react";
import styles from "./Button.module.css";

const Button = ({ nome, href, ...props }) => {
  return (
    <button href={href} className={styles.button} {...props}>
      {nome}
    </button>
  );
};

export default Button;
