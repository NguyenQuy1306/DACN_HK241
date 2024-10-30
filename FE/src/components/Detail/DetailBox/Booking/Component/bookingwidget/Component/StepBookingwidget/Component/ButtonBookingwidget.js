import React, { useState, useEffect, createRef } from "react";
import "./ButtonBookingwidget.css";
import Button from "@mui/material/Button";

const ButtonBookingwidget = ({ icon, text, onClick, colorText, sizeText }) => {
  return (
    <Button className="ButtonBookingwidgetDiv_H1_button" onClick={onClick}>
      {icon}
      <span
        style={{
          color: colorText,
          fontSize: "0.8125rem",
          fontWeight: "400",
          marginTop: "3px",
        }}
      >
        {text}
      </span>
    </Button>
  );
};
export default ButtonBookingwidget;
