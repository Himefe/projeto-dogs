import React from "react";
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
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default Input;
