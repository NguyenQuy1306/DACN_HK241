import React, { useState, useEffect, createRef } from "react";
import "./TimeChooseBookingwidget.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ChooseBookingwidgetDiv_footer } from "../DateChooseBookingwidget/DateChooseBookingwidget";
import PickTimeChooseBookingwidget from "./Component/PickTimeChooseBookingwidget";
const TimeChooseBookingwidget = ({ selectedPlace, setTime, type }) => {
  // const [haveDinner, setHaveDinner] = useState(true);
  // const [haveLunch, setHaveLunch] = useState(true);
  const lunchTime = ["11:30", "12:30", "13:00", "14:00"]; // Fixed the array
  const dinnerTime = ["18:30", "19:00", "20:30"]; // Fixed the array
  const personCount = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <div className="TimeChooseBookingwidgetDiv">
      {" "}
      <div className="TimeChooseBookingwidgetDiv_H1">
        <div className="TimeChooseBookingwidgetDiv_H2">
          <div>
            <div className="TimeChooseBookingwidgetDiv_H3">
              <h3>
                <AccessTimeIcon
                  style={{
                    width: "0.86077em",
                    height: "0.86077em",
                    verticalAlign: "bottom",
                    marginRight: "0.3rem",
                  }}
                ></AccessTimeIcon>
                <span>Choose your time</span>
              </h3>
            </div>
            {lunchTime && type === "Time" && (
              <PickTimeChooseBookingwidget
                text={"Lunch"}
                listTime={lunchTime}
                setTime={setTime}
              ></PickTimeChooseBookingwidget>
            )}
            {dinnerTime && type === "Time" && (
              <PickTimeChooseBookingwidget
                text={"Dinner"}
                listTime={dinnerTime}
                setTime={setTime}
              ></PickTimeChooseBookingwidget>
            )}
            {personCount && type === "Person" && (
              <PickTimeChooseBookingwidget
                text={""}
                listTime={personCount}
                setTime={setTime}
              ></PickTimeChooseBookingwidget>
            )}
            <ChooseBookingwidgetDiv_footer></ChooseBookingwidgetDiv_footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TimeChooseBookingwidget;
