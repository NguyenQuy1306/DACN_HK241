import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./NextButton.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const NextButton = () => {
  return (
    <Button className="NextButton">
      <span className="myspaninNextButton">
        <span>Previous slide</span>
      </span>
      <KeyboardArrowLeftIcon className="iConNextButton"></KeyboardArrowLeftIcon>
    </Button>
  );
};

export default NextButton;
