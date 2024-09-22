import React, { useState, useEffect, createRef } from "react";
import "./StepBookingwidget.css";
import ButtonBookingwidget from "./Component/ButtonBookingwidget";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";

const StepBookingwidget = ({
  selectedPlace,
  datePicked,
  setDate,
  setcloseDateDiv,
}) => {
  const [chooseDate, setChooseDate] = useState();
  const [chooseTime, setChooseTime] = useState();
  const [choosePerson, setChoosePerson] = useState();
  const [chooseOffer, setChooseOffer] = useState();
  const [activeDate, setActiveDate] = useState(true);
  const [activeTime, setActiveTime] = useState(false);
  const [activePerson, setActivePerson] = useState(false);
  const [activeOffer, setActiveOffer] = useState(false);
  const [lastClicked, setLastClicked] = useState(""); // New state to track the last clicked button
  const options = { month: "short", day: "numeric" };
  const formattedDate = datePicked
    ? datePicked.toLocaleDateString("en-US", options)
    : "";

  const getIconStyle = (isActive) => ({
    width: "0.86077em",
    height: "0.86077em",
    verticalAlign: "bottom",
    marginRight: "0.3rem",
    color: isActive ? "white" : "black", // White if the button was clicked, black otherwise
  });
  useEffect(() => {
    if (datePicked) {
      setActiveTime(true);
      setcloseDateDiv(true);
      setLastClicked("Time");
    }
  }, [datePicked]);
  const handleOnClickButtonwidget = (type) => {
    // Set last clicked button
    if (type === "Date") {
      setDate(null);
      setChooseDate(true);
      setActiveTime(false);
      setActivePerson(false);
      setActiveOffer(false);
      setcloseDateDiv(false);
      setLastClicked(type);
    } else if (type === "Time") {
      if (activeTime === false) {
        setActiveTime(!activeTime);
        setcloseDateDiv(true);
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

  return (
    <div className="StepBookingwidgetDiv">
      <div className="StepBookingwidgetDiv_H1">
        <div
          className={`StepBookingwidgetDiv_H3 ${
            activeDate === true ? "active" : ""
          } ${lastClicked === "Date" ? "lastClicked" : ""}`} // Add lastClicked condition
        >
          <ButtonBookingwidget
            icon={
              !datePicked && (
                <CalendarMonthIcon style={getIconStyle(activeDate)} />
              )
            }
            text={datePicked ? formattedDate : "Date"} // Show formatted date if activeDate is not null, otherwise show "Date"
            onClick={() => handleOnClickButtonwidget("Date")}
            colorText={activeDate ? "white" : "black"} // Change color based on activeDate
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
            icon={
              <AccessTimeIcon style={getIconStyle(activeTime)}></AccessTimeIcon>
            }
            text={"Time"}
            onClick={() => handleOnClickButtonwidget("Time")}
            colorText={activeTime === true ? "white" : "black"}
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
                style={getIconStyle(
                  activePerson === true && activeTime === true
                )}
              ></PersonOutlineOutlinedIcon>
            }
            text={"Guest"}
            onClick={() => handleOnClickButtonwidget("Guest")}
            colorText={
              activePerson === true && activeTime === true ? "white" : "black"
            }
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
            icon={
              <AcUnitOutlinedIcon
                style={getIconStyle(
                  activeOffer === true &&
                    activePerson === true &&
                    activeTime === true
                )}
              ></AcUnitOutlinedIcon>
            }
            text={"Offer"}
            colorText={
              activeOffer === true &&
              activePerson === true &&
              activeTime === true
                ? "white"
                : "black"
            }
            onClick={() => handleOnClickButtonwidget("Offer")}
          ></ButtonBookingwidget>
        </div>
      </div>
    </div>
  );
};
export default StepBookingwidget;
