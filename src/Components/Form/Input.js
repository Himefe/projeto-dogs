import React from "react";
import Error from "../Helper/Error";
import styles from "./Input.module.css";

const Input = ({
  type,
  name,
  placeholder,
  id,
  label,
  onChange,
  error,
  value,
  onBlur,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <Error error={error} /> : null}
    </div>
  );
};

export default Input;
