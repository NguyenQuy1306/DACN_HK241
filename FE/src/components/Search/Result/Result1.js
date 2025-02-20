import React, { useState } from "react";
import "antd/dist/reset.css";
import "./ResultSearch.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Result1 = ({ keyword }) => {
  const navigate = useNavigate();
  const handleBackHome = (event) => {
    navigate("../Home");
  };
  const restaurantSearch = useSelector(
    (state) => state.search.restaurantsSearch
  );
  return (
    <>
      <div
        style={{
          height: "25px",
          display: "block",
          width: "100%",
          // zIndex: 20, // ghi lên khi cuộn
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginTop: "1rem",
          maxWidth: "80rem",
        }}
      >
        <nav>
          <ol>
            <li>
              <span className="icon-container">
                <HomeOutlinedIcon
                  className="icon-Home"
                  onClick={handleBackHome}
                />
              </span>
              <ArrowForwardIosOutlinedIcon
                style={{ fontSize: "0.8125rem" }}
              ></ArrowForwardIosOutlinedIcon>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Từ khoá: </span>
              <span className="text-container">"{keyword}" </span>
              <span
                style={{
                  marginLeft: "3px",
                  borderLeft: "3px solid hsl(174, 100%, 20%)",
                  fontWeight: "bold",
                  color: "  rgb(138, 147, 155)",
                }}
              >
                {" "}
                Tìm thấy:
              </span>
              <span style={{ color: " hsl(174, 100%, 20%)" }}>
                {" "}
                ({restaurantSearch.length}) điểm đến
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default Result1;
