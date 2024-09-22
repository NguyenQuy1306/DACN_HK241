import React from "react";
import "./PickTimeChooseBookingwidget.css";
import BoxPickTimeChooseBookingwidget from "./Component/BoxPickTimeChooseBookingwidget";

const PickTimeChooseBookingwidget = ({
  selectedPlace,
  text,
  listTime,
  setTime,
}) => {
  return (
    <div className="PickTimeChooseBookingwidgetDiv">
      <p>
        <span>{text}</span>
      </p>
      <div className="PickTimeChooseBookingwidgetDiv_H1">
        {listTime.map((place, i) => (
          <BoxPickTimeChooseBookingwidget
            key={i}
            time={place}
            setTime={setTime}
          />
        ))}
      </div>
    </div>
  );
};

export default PickTimeChooseBookingwidget;
