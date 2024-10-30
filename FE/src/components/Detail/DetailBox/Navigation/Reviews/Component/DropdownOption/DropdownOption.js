import React from "react";
import "./DropdownOption.css";
import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import DoneIcon from "@mui/icons-material/Done";

const DropdownOption = ({
  selectedPlace,
  text,
  setOnChooseOption1,
  setOnChooseOption2,
  setOnChooseOption3,
  choosedOption,
}) => {
  const handleChooseOption = () => {
    if (text === "Mới nhất") {
      setOnChooseOption1(true);
      setOnChooseOption2(false);
      setOnChooseOption3(false);
    } else if (text === "Rating cao nhất") {
      setOnChooseOption1(false);
      setOnChooseOption2(true);
      setOnChooseOption3(false);
    } else if (text === "Rating thấp nhất") {
      setOnChooseOption1(false);
      setOnChooseOption2(false);
      setOnChooseOption3(true);
    }
  };
  return (
    <div className="DropdownOptionDiv">
      <label className="DropdownOptionDiv_H1" onClick={handleChooseOption}>
        {choosedOption === true && (
          <span className="DropdownOptionDiv_H1_icon">
            <DoneIcon className="DropdownOptionDiv_H1_icon_iconnn"></DoneIcon>
          </span>
        )}
        <span className="DropdownOptionDiv_H1_icon_div">
          <input id="newest" type="radio" value="newest"></input>
        </span>
        <span
          className={`DropdownOptionDiv_H1_text ${
            choosedOption === true ? "active" : ""
          }`}
        >
          <span>{text}</span>
        </span>
      </label>
    </div>
  );
};

export default DropdownOption;
