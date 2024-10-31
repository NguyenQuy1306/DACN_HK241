import React, { useState, useEffect, createRef } from "react";
import "./BoxPickTimeChooseBookingwidget.css";
import Button from "@mui/material/Button";

const BoxPickTimeChooseBookingwidget = ({ selectedPlace, time, setTime }) => {
  return (
    <div className="BoxPickTimeChooseBookingwidgetDiv">
      <Button
        className="BoxPickTimeChooseBookingwidgetDiv_button"
        onClick={() => setTime(time)}
      >
        <span className="BoxPickTimeChooseBookingwidgetDiv_button_span2">
          {time}
        </span>
        <span className="BoxPickTimeChooseBookingwidgetDiv_button_span1">
          MENU
        </span>
      </Button>
    </div>
  );
};
export default BoxPickTimeChooseBookingwidget;
