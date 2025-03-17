import React, { useState, useEffect, createRef } from "react";
import "./PositionInTop.css";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const PositionInTop = ({ text }) => {
  return (
    <div className="PositionInTop">
      {" "}
      <div className="PositionInTop_div1">
        <AutoAwesomeOutlinedIcon className="PositionInTop_div1_icon"></AutoAwesomeOutlinedIcon>

        <span className="PositionInTop_div1_icon_span">
          {" "}
          <span style={{ fontWeight: "bold" }}>Loại hình</span> {text}
        </span>
      </div>
    </div>
  );
};
export default PositionInTop;
