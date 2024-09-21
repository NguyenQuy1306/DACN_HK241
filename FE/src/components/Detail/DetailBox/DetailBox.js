import React, { useState, useEffect, createRef } from "react";
import "./DetailBox.css";
import TitleDetail from "./Title/TitleDetail";
import Booking from "./Booking/Booking";
const DetailBox = ({ selectedPlace }) => {
  return (
    <div className="DetailBoxDiv">
      {" "}
      <TitleDetail selectedPlace={selectedPlace}></TitleDetail>
      <Booking></Booking>
    </div>
  );
};
export default DetailBox;
