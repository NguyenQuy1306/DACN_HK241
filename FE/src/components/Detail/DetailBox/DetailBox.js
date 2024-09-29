import React, { useState, useEffect, createRef } from "react";
import "./DetailBox.css";
import TitleDetail from "./Title/TitleDetail";
import Booking from "./Booking/Booking";
import Navigation from "./Navigation/Navigation";
const DetailBox = ({ selectedPlace }) => {
  return (
    <div className="DetailBoxDiv">
      {" "}
      <TitleDetail selectedPlace={selectedPlace}></TitleDetail>
      <Booking></Booking>
      <Navigation></Navigation>
    </div>
  );
};
export default DetailBox;
