import React, { useState, useEffect, createRef } from "react";
import "./SortDetail.css";
import CheckIcon from "@mui/icons-material/Check";

const SortDetail = ({
  selectedPlace,
  text,
  setChooseRelevance,
  setChoosePrice,
  setChoosePopularity,
  setChooseOffer,
  setChooseNewRestaurant,
  choosed,
}) => {
  const handleOnClickSort = () => {
    if (text == "Liên quan") {
      setChooseRelevance(true);
      setChooseOffer(false);
      setChoosePrice(false);
      setChoosePopularity(false);
      setChooseNewRestaurant(false);
    } else if (text == "Offer") {
      setChooseRelevance(false);
      setChooseOffer(true);
      setChoosePrice(false);
      setChoosePopularity(false);
      setChooseNewRestaurant(false);
    } else if (text == "Giá") {
      setChooseRelevance(false);
      setChooseOffer(false);
      setChoosePrice(true);
      setChoosePopularity(false);
      setChooseNewRestaurant(false);
    } else if (text == "Phổ biến") {
      setChooseRelevance(false);
      setChooseOffer(false);
      setChoosePrice(false);
      setChoosePopularity(true);
      setChooseNewRestaurant(false);
    } else if (text == "Nhà hàng mới") {
      setChooseRelevance(false);
      setChooseOffer(false);
      setChoosePrice(false);
      setChoosePopularity(false);
      setChooseNewRestaurant(true);
    }
  };
  return (
    <div className="SortDetailDiv" onClick={handleOnClickSort}>
      <label className="SortDetailDiv_Label">
        {choosed && (
          <span className="SortDetailDiv_Label_icon">
            <CheckIcon className="SortDetailDiv_Label_icon_div"></CheckIcon>
          </span>
        )}
        <span className="SortDetailDiv_Label_span2">
          <input></input>
        </span>
        <span
          className={`SortDetailDiv_Label_span3 ${
            choosed === true ? "active" : ""
          } `}
        >
          <span>{text}</span>
        </span>
      </label>
    </div>
  );
};
export default SortDetail;
