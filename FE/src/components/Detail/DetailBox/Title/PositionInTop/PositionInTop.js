import React, { useState, useEffect, createRef } from "react";
import "./PositionInTop.css";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const PositionInTop = () => {
  return (
    <div className="PositionInTop">
      {" "}
      <div className="PositionInTop_div1">
        <AutoAwesomeOutlinedIcon className="PositionInTop_div1_icon"></AutoAwesomeOutlinedIcon>
        <a href="https://www.youtube.com/watch?v=Ez0l9oDWGp4">
          <span className="PositionInTop_div1_icon_span">
            #41 in the Top100 Paris
          </span>
        </a>
      </div>
    </div>
  );
};
export default PositionInTop;
