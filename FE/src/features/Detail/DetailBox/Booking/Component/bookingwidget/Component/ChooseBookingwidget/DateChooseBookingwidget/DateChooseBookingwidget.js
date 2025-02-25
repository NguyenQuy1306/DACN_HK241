import React, { useState, useEffect, createRef } from "react";
import "./DateChooseBookingwidget.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const ChooseBookingwidgetDiv_footer = () => {
  return (
    <div className="ChooseBookingwidgetDiv_footer">
      <span>
        Ưu đãi được áp dụng dựa trên thời gian, ngày và số lượng khách và có thể
        thay đổi khi bạn tiếp tục quá trình đặt chỗ.
      </span>
    </div>
  );
};
const DateChooseBookingwidget = ({
  selectedPlace,
  setDate,
  tableAvailable,
}) => {
  const uniqueDates = [...new Set(tableAvailable.map((item) => item.ngay))];
  const dateObjects = uniqueDates.map((dateStr) => new Date(dateStr));

  // Get min and max date
  const minDate = new Date(Math.min(...dateObjects));
  const maxDate = new Date(Math.max(...dateObjects));

  return (
    <div className="ChooseBookingwidgetDiv">
      <div className="ChooseBookingwidgetDiv_H1">
        <div className="ChooseBookingwidgetDiv_H2">
          <Calendar
            onChange={setDate}
            // value={date}
            // minDate={minDate}
            // maxDate={maxDate}
            locale="vi"
            tileDisabled={({ date }) => {
              const dateString = date
                .toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .split("/")
                .reverse()
                .join("-"); // Get the date in YYYY-MM-DD format (format này của database)
              return !uniqueDates.includes(dateString); // Disable the tile if the date is not available
            }}
          ></Calendar>
        </div>
        <ChooseBookingwidgetDiv_footer></ChooseBookingwidgetDiv_footer>
      </div>
    </div>
  );
};
export { DateChooseBookingwidget, ChooseBookingwidgetDiv_footer };
