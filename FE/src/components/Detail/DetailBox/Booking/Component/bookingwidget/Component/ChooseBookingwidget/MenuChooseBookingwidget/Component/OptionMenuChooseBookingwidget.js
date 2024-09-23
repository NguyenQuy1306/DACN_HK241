import React, { useState, useEffect, createRef } from "react";
import "./OptionMenuChooseBookingwidget.css";
import Button from "@mui/material/Button";

const OptionMenuChooseBookingwidget = ({
  selectedPlace,
  text,
  onClick,
  onClick2,
  icon,
}) => {
  const handleOnclickButotn = () => {
    if (text === "Reservation with menu") {
      onClick(true);
      onClick2(false);
    } else {
      onClick(false);
      onClick2(true);
    }
  };
  return (
    <div className="OptionMenuChooseBookingwidgetDiv">
      <Button
        className="OptionMenuChooseBookingwidgetDiv_button"
        onClick={handleOnclickButotn}
      >
        <span className="OptionMenuChooseBookingwidgetDiv_button_H1">
          <span className="OptionMenuChooseBookingwidgetDiv_button_H2">
            {" "}
            <span className="OptionMenuChooseBookingwidgetDiv_button_H2_H1">
              <span className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_H1">
                <span className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_H1_H1">
                  {" "}
                  30 % sale off
                </span>
              </span>
              {text}
              <div className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_div">
                <div className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_div_H1">
                  <div className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_div_H1_H1">
                    30% off
                  </div>
                </div>
              </div>
            </span>
          </span>
          <span className="OptionMenuChooseBookingwidgetDiv_button_H3">
            {icon}
          </span>
        </span>
      </Button>
    </div>
  );
};
export default OptionMenuChooseBookingwidget;
