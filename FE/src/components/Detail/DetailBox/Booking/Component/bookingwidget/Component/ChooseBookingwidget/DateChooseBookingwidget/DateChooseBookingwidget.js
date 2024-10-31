import React, { useState, useEffect, createRef } from "react";
import "./DateChooseBookingwidget.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const ChooseBookingwidgetDiv_footer = () => {
  return (
    <div className="ChooseBookingwidgetDiv_footer">
      <span>
        Offers are based on time, date, and number of guests and may vary as you
        continue the booking process.
      </span>
    </div>
  );
};
const DateChooseBookingwidget = ({ selectedPlace, setDate }) => {
  return (
    <div className="ChooseBookingwidgetDiv">
      <div className="ChooseBookingwidgetDiv_H1">
        <div className="ChooseBookingwidgetDiv_H2">
          <Calendar
            onChange={setDate}
            // value={date}
            minDate={new Date()}
            locale="en-US"
          ></Calendar>
        </div>
        <ChooseBookingwidgetDiv_footer></ChooseBookingwidgetDiv_footer>
      </div>
    </div>
  );
};
export { DateChooseBookingwidget, ChooseBookingwidgetDiv_footer };
