import React, { useState, useEffect, createRef } from "react";
import "./Tags.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Tags = () => {
  return (
    <p className="Tags-p">
      <span className="Tags-p-span1">
        <span>
          <a className="Tags-p-span1-a">
            <span className="Tags-p-span1-a-span">Insider</span>
          </a>
        </span>
      </span>
      <span className="Tags-p-span2"></span>
      <span className="Tags-p-span3">
        <span>
          <a className="Tags-p-span3-a">
            {" "}
            <span className="Tags-p-span3-a-span">French</span>
          </a>
        </span>
      </span>
      <FiberManualRecordIcon className="Tags-p-span4"></FiberManualRecordIcon>
      <span className="Tags-p-span5">
        {" "}
        <span>
          <a className="Tags-p-span5-a">
            {" "}
            <span className="Tags-p-span5-a-span">With friends</span>
          </a>
        </span>
      </span>
    </p>
  );
};
export default Tags;
