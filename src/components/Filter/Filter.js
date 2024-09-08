import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import ButtonFilter from "./Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

const Filter = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ButtonFilter
        iconButton={<StarBorderRoundedIcon></StarBorderRoundedIcon>}
        text="Best Rated"
      ></ButtonFilter>
      <ButtonFilter
        iconButton={
          <LunchDiningIcon style={{ fontSize: "medium" }}></LunchDiningIcon>
        }
        text="Lunch today"
      ></ButtonFilter>
      <ButtonFilter
        iconButton={<AcUnitIcon style={{ fontSize: "medium" }}></AcUnitIcon>}
        text="Special offers"
      ></ButtonFilter>
    </div>
  );
};

export default Filter;
