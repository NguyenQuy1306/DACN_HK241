import React, { useState, useEffect, createRef } from "react";
import "./StepBookingwidget.css";
import ButtonBookingwidget from "./Component/ButtonBookingwidget";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";

const StepBookingwidget = ({ selectedPlace }) => {
  const [chooseDate, setChooseDate] = useState();
  const [chooseTime, setChooseTime] = useState();
  const [choosePerson, setChoosePerson] = useState();
  const [chooseOffer, setChooseOffer] = useState();
  const [activeDate, setActiveDate] = useState(true);
  const [activeTime, setActiveTime] = useState(false);
  const [activePerson, setActivePerson] = useState(false);
  const [activeOffer, setActiveOffer] = useState(false);
  const [lastClicked, setLastClicked] = useState(""); // New state to track the last clicked button

  const style = {
    width: "0.86077em",
    height: "0.86077em",
    verticalAlign: "bottom",
    marginRight: "0.3rem",
  };

  const handleOnClickButtonwidget = (type) => {
    // Set last clicked button

    if (type === "Date") {
      setChooseDate(true);
      setActiveTime(false);
      setActivePerson(false);
      setActiveOffer(false);

      setLastClicked(type);
    } else if (type === "Time") {
      if (activeTime === false) {
        setActiveTime(!activeTime);
      }
      setLastClicked(type);

      setActivePerson(false);
      setActiveOffer(false);
    } else if (type === "Guest") {
      if (activePerson === false) {
        setActivePerson(!activePerson);
      }
      if (activeTime === true) {
        setLastClicked(type);
      }
      setActiveOffer(false);
    } else if (type === "Offer") {
      if (activeOffer === false) {
        setActiveOffer(!activeOffer);
      }
      if (activeTime === true && activePerson === true) {
        setLastClicked(type);
      }
    }
  };

  useEffect(() => {}, [activeTime, activePerson, chooseOffer]);

  return (
    <div className="StepBookingwidgetDiv">
      <div className="StepBookingwidgetDiv_H1">
        <div
          className={`StepBookingwidgetDiv_H3 ${
            activeDate === true ? "active" : ""
          } ${lastClicked === "Date" ? "lastClicked" : ""}`} // Add lastClicked condition
        >
          <ButtonBookingwidget
            icon={<CalendarMonthIcon style={style}></CalendarMonthIcon>}
            text={"Date"}
            onClick={() => handleOnClickButtonwidget("Date")}
          ></ButtonBookingwidget>
          {activeTime === true && <hr className="hr-column" />}
        </div>

        <div
          className={`StepBookingwidgetDiv_H3 ${
            activeTime === true ? "active" : ""
          } ${
            lastClicked === "Time" && activeTime === true ? "lastClicked" : ""
          }`} // Add lastClicked condition
        >
          <ButtonBookingwidget
            icon={<AccessTimeIcon style={style}></AccessTimeIcon>}
            text={"Time"}
            onClick={() => handleOnClickButtonwidget("Time")}
          ></ButtonBookingwidget>
          {activePerson === true && activeTime === true && (
            <hr className="hr-column" />
          )}
        </div>

        <div
          className={`StepBookingwidgetDiv_H3 ${
            activePerson === true && activeTime === true ? "active" : ""
          } ${
            lastClicked === "Guest" &&
            activePerson === true &&
            activeTime === true
              ? "lastClicked"
              : ""
          }`} // Add lastClicked condition
        >
          <ButtonBookingwidget
            icon={
              <PersonOutlineOutlinedIcon
                style={style}
              ></PersonOutlineOutlinedIcon>
            }
            text={"Guest"}
            onClick={() => handleOnClickButtonwidget("Guest")}
          ></ButtonBookingwidget>
          {activeOffer === true &&
            activePerson === true &&
            activeTime === true && <hr className="hr-column" />}
        </div>

        <div
          className={`StepBookingwidgetDiv_H3 ${
            activeOffer === true && activePerson === true && activeTime === true
              ? "active"
              : ""
          } ${
            lastClicked === "Offer" &&
            activeOffer === true &&
            activePerson === true &&
            activeTime === true
              ? "lastClicked"
              : ""
          }`} // Add lastClicked condition
        >
          <ButtonBookingwidget
            icon={<AcUnitOutlinedIcon style={style}></AcUnitOutlinedIcon>}
            text={"Offer"}
            onClick={() => handleOnClickButtonwidget("Offer")}
          ></ButtonBookingwidget>
        </div>
      </div>
    </div>
  );
};
export default StepBookingwidget;
