import React, { useState } from "react";
import "antd/dist/reset.css";
import "./ResultSearch.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Result1 from "./Result1";
const ResultSearch = ({ keyword }) => {
  const handleBackHome = (event) => {
    console.log("Back homepage");
  };

  return (
    <>
      <Result1 keyword={keyword}></Result1>
      {/* <div
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
      </div> */}
    </>
  );
};

export default ResultSearch;
