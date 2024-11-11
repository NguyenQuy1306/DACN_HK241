import React from "react";
import "./OptionMenuChooseBookingwidget.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

const OptionMenuChooseBookingwidget = ({
  selectedPlace,
  text,
  onClick,
  onClick2,
  icon,
  choosedOptionByWithMenu,
  openBookingWithMenu,
}) => {
  const handleOnclickButton = () => {
    // Nếu openBookingWithMenu là true và text không phải là "Reservation with menu", dừng hàm tại đây
    if (openBookingWithMenu && text !== "Reservation with menu") {
      return;
    }

    // Điều kiện để thay đổi trạng thái khi text là "Reservation with menu"
    if (text === "Reservation with menu") {
      onClick(true);
      onClick2(false);
    } else {
      onClick(false);
      onClick2(true);
    }
  };

  return (
    <div className="OptionMenuChooseBookingwidgetDiv">
      <Button
        className={`OptionMenuChooseBookingwidgetDiv_button ${
          choosedOptionByWithMenu ? "active" : ""
        } ${text === "Reservation with menu" ? "" : "size"}`}
        onClick={handleOnclickButton}
        // Vô hiệu hóa nút nếu openBookingWithMenu là true và text là "Reservation without menu"
        disabled={openBookingWithMenu && text === "Reservation without menu"}
      >
        <span className="OptionMenuChooseBookingwidgetDiv_button_H1">
          <span
            className={`OptionMenuChooseBookingwidgetDiv_button_H2 ${
              text === "Reservation with menu" ? "" : "active"
            } `}
          >
            <span className="OptionMenuChooseBookingwidgetDiv_button_H2_H1">
              <span
                className={`OptionMenuChooseBookingwidgetDiv_button_H2_H1_H1 ${
                  text === "Reservation with menu" ? "" : "active"
                } `}
              >
                {text === "Reservation with menu" ? (
                  <span className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_H1_H1">
                    30 % sale off
                  </span>
                ) : (
                  text
                )}
              </span>
              {text === "Reservation with menu" && text}
              {text === "Reservation with menu" && (
                <div className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_div">
                  <div className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_div_H1">
                    <div className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_div_H1_H1">
                      30% off
                    </div>
                  </div>
                </div>
              )}
            </span>
          </span>
          <span
            className={`OptionMenuChooseBookingwidgetDiv_button_H3 ${
              text === "Reservation with menu" ? "" : "active"
            } `}
          >
            {icon}
          </span>
        </span>
      </Button>
    </div>
  );
};

export default OptionMenuChooseBookingwidget;
