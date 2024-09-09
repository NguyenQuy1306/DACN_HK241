import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ColorButton = styled(Button)(({ click }) => ({
  backgroundColor: click ? "#d4e8f5" : "hsl(0, 0%, 100%)",
  "&:hover": click
    ? {
        backgroundColor: "#699dc1",
        border: "1px solid #699dc1",
      }
    : {
        backgroundColor: "#d4e8f5",
        border: "1px solid #5FC3F1",
        color: "#164d77",
      },
  border: "1px solid hsl(214, 9%, 85%)",
  borderRadius: "9999px",
  color: click ? "#164d77" : "hsl(218, 9%, 17%)",
  fontFamily: "RalewayX, arial, sans-serif",
  cursor: "pointer",
  fontSize: "0.8125rem",
  fontWeight: "400",
  fontStyle: "normal",
  alignItems: "center",
  textTransform: "none", // Prevent text from being uppercase
  boxShadow: "none",
  marginRight: "10px",
}));

export default function ButtonFilter({ iconButton, text }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
  };

  return (
    <ColorButton variant="contained" onClick={handleClick} click={click}>
      {iconButton}
      {text}
    </ColorButton>
  );
}
