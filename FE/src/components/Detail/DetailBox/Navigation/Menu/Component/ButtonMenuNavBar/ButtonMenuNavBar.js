import React from "react";
import "./ButtonMenuNavBar.css";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getFood } from "../../../../../../../redux/features/foodSlice";
const ButtonMenuNavBar = ({
  selectedPlace,
  text,
  clicked,
  setOnClickMenuNavBar1,
  setOnClickMenuNavBar2,
  setOnClickMenuNavBar3,
}) => {
  const dispatch = useDispatch();

  const handleOnClickMenuNavBar = () => {
    if (text === "Tất cả món ăn") {
      setOnClickMenuNavBar1(false);
      setOnClickMenuNavBar2(true);
      setOnClickMenuNavBar3(false);
    } else if (text === "Tạo combo mới") {
      setOnClickMenuNavBar1(false);
      setOnClickMenuNavBar2(false);
      setOnClickMenuNavBar3(true);
      console.log("selectedPlace.maSoNhaHang", selectedPlace.maSoNhaHang);
      console.log("selectedPlace", selectedPlace.maSoNhaHang);
      dispatch(getFood({ restaurantId: selectedPlace.maSoNhaHang }));
    } else if (text === "Các combo có sẵn") {
      setOnClickMenuNavBar1(true);
      setOnClickMenuNavBar2(false);
      setOnClickMenuNavBar3(false);
    }
  };
  return (
    <span className="ButtonMenuNavBarDiv">
      <a>
        <Button
          className={`ButtonMenuNavBarDiv_button ${
            clicked === true ? "active" : ""
          }`}
          onClick={handleOnClickMenuNavBar}
        >
          <span>{text}</span>
        </Button>
      </a>
    </span>
  );
};

export default ButtonMenuNavBar;
