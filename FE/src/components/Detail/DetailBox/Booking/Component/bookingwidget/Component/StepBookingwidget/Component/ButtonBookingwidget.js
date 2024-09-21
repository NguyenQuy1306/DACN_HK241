import React, { useState, useEffect, createRef } from "react";
import "./ButtonBookingwidget.css";
import Button from "@mui/material/Button";

const ButtonBookingwidget = ({ icon, text, onClick }) => {
  return (
    <Button className="ButtonBookingwidgetDiv_H1_button" onClick={onClick}>
      {icon}
      <span>{text}</span>
    </Button>
  );
};
export default ButtonBookingwidget;
