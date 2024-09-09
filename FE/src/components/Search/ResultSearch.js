import React, { useState } from "react";
import "antd/dist/reset.css";
import "./ResultSearch.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const ResultSearch = () => {
  const handleBackHome = (event) => {
    console.log("Back homepage");
  };

  return (
    <>
      <div
        style={{
          height: "24px",
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
              <span className="text-container">
                The 10 Best Restaurants in Paris
              </span>
            </li>
          </ol>
        </nav>
      </div>
      <div
        style={{
          height: "45px",

          paddingLeft: "1rem",
          paddingRight: "1rem",
          maxWidth: "80rem",
        }}
      >
        <div className="ResultSearch2">
          <span className="span_ResultSearch2_1">
            The 10 Best Restaurants in Paris
          </span>
          <div className="Result_count">
            <span className="span_ResultSearch2_2"> 4,020 restaurants</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultSearch;
