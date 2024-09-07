import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import ButtonFilter from "./Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
const Filter = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ButtonFilter iconButton={StarBorderRoundedIcon}></ButtonFilter>
    </div>
  );
};

export default Filter;
