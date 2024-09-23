import React, { useState, useEffect, createRef } from "react";
import "./Bookingwidget.css";
import HeaderBookingwidget from "./Component/HeaderBookingwidget/HeaderBookingwidget";
import StepBookingwidget from "./Component/StepBookingwidget/StepBookingwidget";
import { DateChooseBookingwidget } from "./Component/ChooseBookingwidget/DateChooseBookingwidget/DateChooseBookingwidget";
import TimeChooseBookingwidget from "./Component/ChooseBookingwidget/TimeChooseBookingwidget/TimeChooseBookingwidget";
import MenuChooseBookingwidget from "./Component/ChooseBookingwidget/MenuChooseBookingwidget/MenuChooseBookingwidget";
import { Menu } from "@mui/material";
const Bookingwidget = ({ selectedPlace }) => {
  const [date, setDate] = useState(null);
  const [closeDateDiv, setcloseDateDiv] = useState(false);
  const [time, setTime] = useState(null);
  const [closeTimeDiv, setcloseTimeDiv] = useState(true);
  const [person, setPerson] = useState(null);
  const [closePersonDiv, setClosePersonDiv] = useState(true);

  // useEffect(() => {
  //   if (person) {
  //     console.log("person", person);
  //   }
  // }, [person]);

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
        timePicked={time}
        personPicked={person}
        setDate={setDate}
        setTime={setTime}
        setPerson={setPerson}
        setcloseDateDiv={setcloseDateDiv}
        setcloseTimeDiv={setcloseTimeDiv}
        setclosePersonDiv={setClosePersonDiv}
      ></StepBookingwidget>
      {closeDateDiv === false && (
        <DateChooseBookingwidget setDate={setDate}></DateChooseBookingwidget>
      )}
      {closeTimeDiv === false && (
        <TimeChooseBookingwidget
          setTime={setTime}
          type={"Time"}
        ></TimeChooseBookingwidget>
      )}
      {closePersonDiv === false && (
        // <TimeChooseBookingwidget
        //   setTime={setPerson}
        //   type={"Person"}
        // ></TimeChooseBookingwidget>
        <MenuChooseBookingwidget></MenuChooseBookingwidget>
      )}
    </div>
  );
};
export default Bookingwidget;
