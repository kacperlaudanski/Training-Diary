import React from "react";
import styles from "./styles/errors.module.css";

const ErrorMessage = (props) => {
  return <small className={styles.error_message}>{props.children}</small>;
};


export default ErrorMessage; 