import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./style.module.css";

export default function ButtonGreen({ text, onClick }) {
  // const handleOnclick = () => {
  //   onClick();
  // };
  return (
    <Button
      className={styles.bookButton}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {/* {iconButton} */}
      {text}
    </Button>
  );
}
