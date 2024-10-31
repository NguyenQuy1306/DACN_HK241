import React, { useState, useEffect, createRef } from "react";
import "./Booking.css";
import Bookingwidget from "./Component/bookingwidget/Bookingwidget";
const Booking = ({ selectedPlace }) => {
  return (
    <div className="BookingDiv">
      <div className="BookingDiv_H2">
        <div className="BookingDiv_H3">
          <Bookingwidget></Bookingwidget>
        </div>
      </div>
    </div>
  );
};
export default Booking;
