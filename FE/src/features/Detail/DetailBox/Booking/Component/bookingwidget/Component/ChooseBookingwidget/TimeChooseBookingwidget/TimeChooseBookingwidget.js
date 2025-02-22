import React, { useState, useEffect, createRef } from "react";
import "./TimeChooseBookingwidget.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ChooseBookingwidgetDiv_footer } from "../DateChooseBookingwidget/DateChooseBookingwidget";
import PickTimeChooseBookingwidget from "./Component/PickTimeChooseBookingwidget";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const TimeChooseBookingwidget = ({
  selectedPlace,
  setTime,
  type,
  text,
  timeTableAvailable,
}) => {
  // const [haveDinner, setHaveDinner] = useState(true);
  // const [haveLunch, setHaveLunch] = useState(true);
  const [lunchTime, setLunchTime] = useState([]);
  const [dinnerTime, setDinnerTime] = useState([]);
  const [personCount, setPersonCount] = useState([]);

  useEffect(() => {
    if (type === "Time") {
      const lunchTimes = timeTableAvailable.filter((item) => {
        const [hours, minutes] = item.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        return timeInMinutes >= 11 * 60 && timeInMinutes <= 16 * 60;
      });

      const dinnerTimes = timeTableAvailable.filter((item) => {
        const [hours, minutes] = item.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        return timeInMinutes > 16 * 60 && timeInMinutes <= 24 * 60;
      });

      setLunchTime(lunchTimes);
      setDinnerTime(dinnerTimes);
    } else {
      setPersonCount(timeTableAvailable);
    }
  }, [timeTableAvailable, type]);

  return (
    <div className="TimeChooseBookingwidgetDiv">
      {" "}
      <div className="TimeChooseBookingwidgetDiv_H1">
        <div className="TimeChooseBookingwidgetDiv_H2">
          <div>
            <div className="TimeChooseBookingwidgetDiv_H3">
              <h3>
                {type === "Time" ? (
                  <AccessTimeIcon
                    style={{
                      width: "0.86077em",
                      height: "0.86077em",
                      verticalAlign: "bottom",
                      marginRight: "0.3rem",
                    }}
                  ></AccessTimeIcon>
                ) : (
                  <PersonOutlineOutlinedIcon
                    style={{
                      width: "0.86077em",
                      height: "0.86077em",
                      verticalAlign: "bottom",
                      marginRight: "0.3rem",
                    }}
                  ></PersonOutlineOutlinedIcon>
                )}
                <span>Chọn {text}</span>
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
                text={"Person"}
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
