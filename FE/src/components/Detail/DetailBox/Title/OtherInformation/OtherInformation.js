import React, { useState, useEffect, createRef } from "react";
import "./OtherInformation.css";
import OtherInformationComponent from "./Component/OtherInformationComponent";
const OtherInformation = ({ selectedPlace }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
      <div className="OtherInformation_H1">
        {" "}
        <OtherInformationComponent></OtherInformationComponent>
        <OtherInformationComponent></OtherInformationComponent>
        <OtherInformationComponent></OtherInformationComponent>
      </div>
    </div>
  );
};
export default OtherInformation;
