import React, { useState, useEffect } from "react";
import { DatePicker, Select, Row, Col } from "antd";
import "antd/dist/reset.css";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./ant.css";
import {
  getRestaurantsInMaps,
  saveCurrentPage,
  saveFilterTable,
} from "../../redux/features/restaurantSlice";
const { Option } = Select;

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPersons, setSelectedPersons] = useState(null);
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [isTimeSelectOpen, setIsTimeSelectOpen] = useState(false);
  const [isPersonSelectOpen, setIsPersonSelectOpen] = useState(false);
  const dispatch = useDispatch();
  const availableTimes = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  const availablePersons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bounds = useSelector((state) => state.restaurant.bounds);
  const currentPage = useSelector((state) => state.restaurant.currentPage);
  const date = useSelector((state) => state.restaurant.date);

  useEffect(() => {
    if (selectedDate && selectedPersons && selectedTime && bounds) {
      const { ne, sw } = bounds;
      dispatch(
        saveFilterTable({
          time: selectedTime,
          date: selectedDate,
          people: selectedPersons,
        })
      );
      console.log("whatthefukkk");
      dispatch(saveCurrentPage(0));
      dispatch(
        getRestaurantsInMaps({
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
          page: 0,
          date: selectedDate,
          people: selectedPersons,
          time: selectedTime,
          size: 10,
        })
      );
    }
  }, [selectedDate, selectedTime, selectedPersons]);
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setIsDateSelectOpen(false);
    if (!selectedTime) {
      setIsTimeSelectOpen(true);
    } else if (!selectedPersons) {
      setIsPersonSelectOpen(true);
    }
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
    setIsTimeSelectOpen(false);
    if (!selectedPersons) {
      setIsPersonSelectOpen(true);
    } else if (!selectedDate) {
      setIsDateSelectOpen(true);
    }
  };

  const handlePersonChange = (value) => {
    setSelectedPersons(value);
    setIsPersonSelectOpen(false);
    if (!selectedDate) {
      setIsDateSelectOpen(true);
    } else if (!selectedTime) {
      setIsTimeSelectOpen(true);
    }
  };
  const handleClearFilterType = () => {
    setSelectedDate(null);
    setSelectedPersons(null);
    setSelectedTime(null);
    const { ne, sw } = bounds;
    dispatch(
      saveFilterTable({
        time: null,
        date: null,
        people: null,
      })
    );
    console.log("datedat23232e", date);
    dispatch(saveCurrentPage(0));
    dispatch(
      getRestaurantsInMaps({
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
        page: 0,
        size: 10,
      })
    );
  };
  useEffect(() => {
    if (
      (selectedPersons || selectedTime || selectedDate) &&
      !isTimeSelectOpen &&
      !isDateSelectOpen &&
      !isPersonSelectOpen
    ) {
      if (!selectedPersons && !selectedTime && selectedDate) {
        setSelectedDate(null);
      } else if (!selectedPersons && selectedTime && selectedDate) {
        setSelectedDate(null);
        setSelectedTime(null);
      } else if (selectedPersons && !selectedTime && selectedDate) {
        setSelectedDate(null);
        setSelectedPersons(null);
      } else if (!selectedPersons && selectedTime && !selectedDate) {
        setSelectedTime(null);
      } else if (selectedPersons && !selectedTime && !selectedDate) {
        setSelectedPersons(null);
      } else if (selectedPersons && selectedTime && !selectedDate) {
        setSelectedPersons(null);
        setSelectedTime(null);
      }
    }
  }, [
    isPersonSelectOpen,
    isTimeSelectOpen,
    isDateSelectOpen,
    selectedPersons,
    selectedTime,
    selectedDate,
  ]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        gutter={16}
        style={{
          background: "white",
          borderRadius: "9999px",
          border: "2px solid hsl(201, 100%, 30%)",
          display: "flex",
        }}
      >
        <DatePicker
          placeholder="Date"
          disabledDate={(current) => {
            let customDate = moment().format("YYYY-MM-DD");
            return current && current < moment(customDate, "YYYY-MM-DD");
          }}
          onChange={handleDateChange}
          open={isDateSelectOpen}
          onOpenChange={(open) => setIsDateSelectOpen(open)}
          value={selectedDate ? moment(selectedDate) : null}
          style={{
            border: "none",
            borderRadius: "9999px",
            width: 120,
          }}
        />
        <div
          style={{
            width: "1px",
            height: "15px",
            backgroundColor: "hsl(214, 9%, 85%)",
            marginTop: "9px",
          }}
        ></div>
        <Select
          placeholder="Time"
          style={{ width: 95, border: "none" }}
          value={selectedTime ? selectedTime : null}
          onChange={handleTimeChange}
          open={isTimeSelectOpen}
          onDropdownVisibleChange={(open) => setIsTimeSelectOpen(open)}
          suffixIcon={<ScheduleIcon style={{ fontSize: "medium" }} />}
        >
          {availableTimes.map((time) => (
            <Option key={time} value={time}>
              {" "}
              {time}
            </Option>
          ))}
        </Select>
        <div
          style={{
            width: "1px",
            height: "15px",
            backgroundColor: "hsl(214, 9%, 85%)",
            marginTop: "9px",
          }}
        ></div>
        <Select
          placeholder="Persons"
          style={{ width: 95, border: "none", borderRadius: "9999px" }}
          value={selectedPersons}
          onChange={handlePersonChange}
          open={isPersonSelectOpen}
          onDropdownVisibleChange={(open) => setIsPersonSelectOpen(open)}
          suffixIcon={<PersonOutlineIcon style={{ fontSize: "medium" }} />}
        >
          {availablePersons.map((num) => (
            <Option key={num} value={num}>
              {num} Person
            </Option>
          ))}
        </Select>
      </div>
      <DeleteIcon
        style={{
          fontSize: "medium",
          marginTop: "10px",
          marginLeft: "6px",
          cursor: "pointer",
          transition: "transform 0.2s, color 0.2s",
        }}
        onClick={() => handleClearFilterType()} // Call the function when clicked
      />
      <div
        style={{
          width: "1px",
          height: "15px",
          backgroundColor: "hsl(214, 9%, 85%)",
          marginTop: "9px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      ></div>
    </div>
  );
};

export default Reservation;
