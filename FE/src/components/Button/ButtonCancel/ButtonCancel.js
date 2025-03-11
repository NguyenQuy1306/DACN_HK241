import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./style.module.css";

export default function ButtonCancel({ text, onClick }) {
  const handleOnclick = () => {
    onClick(true);
  };
  return (
    <Button className={styles.bookButton} onClick={handleOnclick}>
      {/* {iconButton} */}
      {text}
    </Button>
  );
}
