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
    // Nếu openBookingWithMenu là true và text không phải là "Đặt bàn với menu có sẵn", dừng hàm tại đây
    if (openBookingWithMenu && text !== "Đặt bàn với menu có sẵn") {
      return;
    }

    // Điều kiện để thay đổi trạng thái khi text là "Đặt bàn với menu có sẵn"
    if (text === "Đặt bàn với menu có sẵn") {
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
        } ${text === "Đặt bàn với menu có sẵn" ? "" : "size"}`}
        onClick={handleOnclickButton}
        // Vô hiệu hóa nút nếu openBookingWithMenu là true và text là "Đặt bàn không kèm theo menu"
        disabled={openBookingWithMenu && text === "Đặt bàn không kèm theo menu"}
      >
        <span className="OptionMenuChooseBookingwidgetDiv_button_H1">
          <span
            className={`OptionMenuChooseBookingwidgetDiv_button_H2 ${
              text === "Đặt bàn với menu có sẵn" ? "" : "active"
            } `}
          >
            <span className="OptionMenuChooseBookingwidgetDiv_button_H2_H1">
              <span
                className={`OptionMenuChooseBookingwidgetDiv_button_H2_H1_H1 ${
                  text === "Đặt bàn với menu có sẵn" ? "" : "active"
                } `}
              >
                {text === "Đặt bàn với menu có sẵn" ? (
                  <span className="OptionMenuChooseBookingwidgetDiv_button_H2_H1_H1_H1">
                    {/* 30 % sale off */}
                  </span>
                ) : (
                  text
                )}
              </span>
              {text === "Đặt bàn với menu có sẵn" && text}
              {text === "Đặt bàn với menu có sẵn" && (
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
              text === "Đặt bàn với menu có sẵn" ? "" : "active"
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
