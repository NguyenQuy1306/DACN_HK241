import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./style.module.css";

export default function ButtonBooking({ text }) {
  return (
    <Button variant="contained" className={styles.bookButton}>
      {/* {iconButton} */}
      {text}
    </Button>
  );
}
