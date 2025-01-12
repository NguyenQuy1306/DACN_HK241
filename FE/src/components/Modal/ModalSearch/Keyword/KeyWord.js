import React, { useState, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import "./KeyWord.css";
const KeyWord = ({ text }) => {
  return (
    <div className="KeyWordDiv">
      <SearchIcon></SearchIcon>
      <a>{text}</a>
    </div>
  );
};

export default KeyWord;
