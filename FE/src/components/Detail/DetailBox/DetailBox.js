import React, { useState, useEffect, createRef } from "react";
import "./DetailBox.css";
import TitleDetail from "./Title/TitleDetail";
const DetailBox = ({ selectedPlace }) => {
  return (
    <div className="DetailBoxDiv">
      {" "}
      <TitleDetail selectedPlace={selectedPlace}></TitleDetail>
    </div>
  );
};
export default DetailBox;
