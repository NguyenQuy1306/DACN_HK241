import React, { useState, useEffect, createRef } from "react";
import "./Bookingwidget.css";
import HeaderBookingwidget from "./Component/HeaderBookingwidget/HeaderBookingwidget";
import StepBookingwidget from "./Component/StepBookingwidget/StepBookingwidget";
import ChooseBookingwidget from "./Component/ChooseBookingwidget/ChooseBookingwidget";
const Bookingwidget = ({ selectedPlace }) => {
  return (
    <div className="BookingwidgetDiv">
      <HeaderBookingwidget></HeaderBookingwidget>
      <div className="BookingwidgetDiv_h1"></div>
      <StepBookingwidget></StepBookingwidget>
      <ChooseBookingwidget></ChooseBookingwidget>
    </div>
  );
};
export default Bookingwidget;
