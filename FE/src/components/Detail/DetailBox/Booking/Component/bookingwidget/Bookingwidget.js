import React, { useState, useEffect, createRef } from "react";
import "./Bookingwidget.css";
import HeaderBookingwidget from "./Component/HeaderBookingwidget/HeaderBookingwidget";
import StepBookingwidget from "./Component/StepBookingwidget/StepBookingwidget";
import ChooseBookingwidget from "./Component/ChooseBookingwidget/ChooseBookingwidget";
const Bookingwidget = ({ selectedPlace }) => {
  const [date, setDate] = useState(null);
  const [closeDateDiv, setcloseDateDiv] = useState(false);
  useEffect(() => {
    if (date) {
    }
  }, [date]);

  return (
    <div className="BookingwidgetDiv">
      <HeaderBookingwidget></HeaderBookingwidget>
      <div className="BookingwidgetDiv_h1">
        <span>
          {" "}
          🔥 Already <b> bookings</b> today
        </span>
      </div>
      <StepBookingwidget
        datePicked={date}
        setDate={setDate}
        setcloseDateDiv={setcloseDateDiv}
      ></StepBookingwidget>
      {closeDateDiv === false && (
        <ChooseBookingwidget setDate={setDate}></ChooseBookingwidget>
      )}
    </div>
  );
};
export default Bookingwidget;
