import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./ButtonFilter.css";

export default function ButtonFilter({ iconButton, text }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className={`color-button ${click ? "color-button-click" : ""}`}
    >
      {iconButton}
      {text}
    </Button>
  );
}
