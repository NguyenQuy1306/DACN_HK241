import React, { useState, useEffect, createRef } from "react";
import "./HeaderBookingwidget.css";
const HeaderBookingwidget = ({ selectedPlace }) => {
  return (
    <div className="HeaderBookingwidgetDiv">
      <div className="HeaderBookingwidgetDiv_H1">
        <h3 className="HeaderBookingwidgetDiv_H1_H3">
          <span>Tìm bàn</span>
        </h3>
      </div>
      <p className="HeaderBookingwidgetDiv_p">
        <span>Book for free</span>
      </p>
    </div>
  );
};
export default HeaderBookingwidget;
