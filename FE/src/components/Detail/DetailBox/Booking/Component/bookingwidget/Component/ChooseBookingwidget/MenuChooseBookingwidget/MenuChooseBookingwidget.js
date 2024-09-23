import React, { useState, useEffect, createRef } from "react";
import "./MenuChooseBookingwidget.css";
import OptionMenuChooseBookingwidget from "./Component/OptionMenuChooseBookingwidget";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
const MenuChooseBookingwidget = ({ selectedPlace }) => {
  const [choosedOptionByWithMenu, setChoosedOptionByWithMenu] = useState(true);
  const [choosedOptionByWithoutMenu, setChoosedOptionByWithoutMenu] =
    useState(false);

  return (
    <div className="MenuChooseBookingwidgetDiv">
      <div className="MenuChooseBookingwidgetDiv_H1">
        <div className="MenuChooseBookingwidgetDiv_H1_option">
          <h3 className="MenuChooseBookingwidgetDiv_H1_option_h3">
            <span>Select an option</span>
          </h3>
          <div className="MenuChooseBookingwidgetDiv_H1_option_choosen">
            <OptionMenuChooseBookingwidget
              text={"Reservation with menu"}
              onClick={setChoosedOptionByWithMenu}
              onClick2={setChoosedOptionByWithoutMenu}
              icon={
                !choosedOptionByWithMenu ? (
                  <CheckCircleOutlineRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon"></CheckCircleOutlineRoundedIcon>
                ) : (
                  <CheckCircleRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon2"></CheckCircleRoundedIcon>
                )
              }
            ></OptionMenuChooseBookingwidget>
            <OptionMenuChooseBookingwidget
              text={"Reservation without menu"}
              onClick={setChoosedOptionByWithMenu}
              onClick2={setChoosedOptionByWithoutMenu}
              icon={
                !choosedOptionByWithoutMenu ? (
                  <CheckCircleOutlineRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon"></CheckCircleOutlineRoundedIcon>
                ) : (
                  <CheckCircleRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon2"></CheckCircleRoundedIcon>
                )
              }
            ></OptionMenuChooseBookingwidget>
          </div>
        </div>
        <div className="MenuChooseBookingwidgetDiv_H1_divButton">
          <Button className="MenuChooseBookingwidgetDiv_H1_divButton_Button">
            <span>CONTINUE</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MenuChooseBookingwidget;
