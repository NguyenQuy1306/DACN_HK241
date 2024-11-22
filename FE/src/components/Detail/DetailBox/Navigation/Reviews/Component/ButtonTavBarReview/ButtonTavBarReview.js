import React, { useState, useEffect, createRef } from "react";
import "./ButtonTavBarReview.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getComboAvailable } from "../../../../../../../redux/features/comboSlice";
import { getRateInRestaurant } from "../../../../../../../redux/features/rateSlice";
import { setActiveTab } from "../../../../../../../redux/features/navigationSlice";
const ButtonTavBarReview = ({
  selectedPlace,
  text,

  checkOnClick,
}) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.navigation.activeTab);

  const handleOnClickButtonTavBarReview = () => {
    if (text === "Chi tiết") {
      dispatch(setActiveTab(text));
    } else if (text === "Menu") {
      dispatch(getComboAvailable({ restaurantId: selectedPlace.maSoNhaHang }));
      dispatch(setActiveTab(text));
    } else if (text === "Chỉ đường") {
      dispatch(setActiveTab(text));
    } else if (text === "Reviews") {
      dispatch(
        getRateInRestaurant({ restaurantId: selectedPlace.maSoNhaHang })
      );

      dispatch(setActiveTab(text));
    }
  };
  return (
    <Button
      className="ButtonTavBarReviewDiv"
      onClick={() => handleOnClickButtonTavBarReview()}
    >
      <div
        className={`ButtonTavBarReviewDiv_H1 ${
          activeTab === text ? "active" : ""
        }
    `}
      >
        <span>{text}</span>
      </div>
    </Button>
  );
};
export default ButtonTavBarReview;
