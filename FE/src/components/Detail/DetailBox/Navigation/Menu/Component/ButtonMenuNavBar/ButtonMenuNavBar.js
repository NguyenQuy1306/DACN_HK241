import React from "react";
import "./ButtonMenuNavBar.css";
import { Button } from "@mui/material";
const ButtonMenuNavBar = ({
  selectedPlace,
  text,
  clicked,
  setOnClickMenuNavBar1,
  setOnClickMenuNavBar2,
  setOnClickMenuNavBar3,
}) => {
  const handleOnClickMenuNavBar = () => {
    if (text === "Tất cả món ăn") {
      setOnClickMenuNavBar1(false);
      setOnClickMenuNavBar2(true);
      setOnClickMenuNavBar3(false);
    } else if (text === "Tạo combo mới") {
      setOnClickMenuNavBar1(false);
      setOnClickMenuNavBar2(false);
      setOnClickMenuNavBar3(true);
    } else if (text === "Các combo có sẵn") {
      setOnClickMenuNavBar1(true);
      setOnClickMenuNavBar2(false);
      setOnClickMenuNavBar3(false);
    }
  };
  return (
    <span className="ButtonMenuNavBarDiv">
      <a>
        <Button
          className={`ButtonMenuNavBarDiv_button ${
            clicked === true ? "active" : ""
          }`}
          onClick={handleOnClickMenuNavBar}
        >
          <span>{text}</span>
        </Button>
      </a>
    </span>
  );
};

export default ButtonMenuNavBar;
