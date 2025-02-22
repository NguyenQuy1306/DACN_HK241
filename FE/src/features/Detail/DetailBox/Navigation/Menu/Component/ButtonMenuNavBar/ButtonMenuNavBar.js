import React from "react";
import "./ButtonMenuNavBar.css";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getFood } from "../../../../../../../redux/features/foodSlice";
import { setActiveTabMenu } from "../../../../../../../redux/features/navigationSlice";
const ButtonMenuNavBar = ({ selectedPlace, text }) => {
  const dispatch = useDispatch();
  const activeTabMenu = useSelector((state) => state.navigation.activeTabMenu);
  const handleOnClickMenuNavBar = () => {
    if (text === "Tất cả món ăn") {
      dispatch(setActiveTabMenu(text));
    } else if (text === "Tạo combo mới") {
      dispatch(setActiveTabMenu(text));

      dispatch(getFood({ restaurantId: selectedPlace.maSoNhaHang }));
    } else if (text === "Các combo có sẵn") {
      dispatch(setActiveTabMenu(text));
    }
  };
  return (
    <span className="ButtonMenuNavBarDiv">
      <a>
        <Button
          className={`ButtonMenuNavBarDiv_button ${
            activeTabMenu === text ? "active" : ""
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
