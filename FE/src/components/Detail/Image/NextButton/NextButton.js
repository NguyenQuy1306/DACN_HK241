import React from "react";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./NextButton.css";

const NextButton = ({ dimenson, onClick }) => {
  return (
    <div>
      {dimenson ? (
        <Button
          className="NextButton"
          style={{ left: "1rem" }}
          onClick={onClick} // Handle click for previous slide
        >
          <span className="myspaninNextButton">
            <span>Previous slide</span>
          </span>
          <KeyboardArrowLeftIcon className="iConNextButton" />
        </Button>
      ) : (
        <Button
          className="NextButton"
          style={{ right: "1rem" }}
          onClick={onClick} // Handle click for next slide
        >
          <span className="myspaninNextButton">
            <span>Next slide</span>
          </span>
          <KeyboardArrowRightIcon className="iConNextButton" />
        </Button>
      )}
    </div>
  );
};

export default NextButton;
