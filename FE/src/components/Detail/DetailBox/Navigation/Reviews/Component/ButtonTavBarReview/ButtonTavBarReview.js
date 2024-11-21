import React, { useState, useEffect, createRef } from "react";
import "./ButtonTavBarReview.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getComboAvailable } from "../../../../../../../redux/features/comboSlice";
import { getRateInRestaurant } from "../../../../../../../redux/features/rateSlice";
const ButtonTavBarReview = ({
  selectedPlace,
  text,
  setOnClickDetail,
  setOnClicMenu,
  setOnClickPath,
  setOnClickReviews,
  checkOnClick,
}) => {
  const dispatch = useDispatch();
  const handleOnClickButtonTavBarReview = () => {
    if (text === "Chi tiết") {
      setOnClickDetail(true);
      setOnClicMenu(false);
      setOnClickPath(false);
      setOnClickReviews(false);
    } else if (text === "Menu") {
      dispatch(getComboAvailable({ restaurantId: selectedPlace.maSoNhaHang }));
      setOnClickDetail(false);
      setOnClicMenu(true);
      setOnClickPath(false);
      setOnClickReviews(false);
    } else if (text === "Chỉ đường") {
      setOnClickDetail(false);
      setOnClicMenu(false);
      setOnClickPath(true);
      setOnClickReviews(false);
    } else if (text === "Reviews") {
      dispatch(
        getRateInRestaurant({ restaurantId: selectedPlace.maSoNhaHang })
      );

      setOnClickDetail(false);
      setOnClicMenu(false);
      setOnClickPath(false);
      setOnClickReviews(true);
    }
  };
  return (
    <Button
      className="ButtonTavBarReviewDiv"
      onClick={() => handleOnClickButtonTavBarReview()}
    >
      <div
        className={`ButtonTavBarReviewDiv_H1 ${
          checkOnClick === true ? "active" : ""
        }
    `}
      >
        <span>{text}</span>
      </div>
    </Button>
  );
};
export default ButtonTavBarReview;
