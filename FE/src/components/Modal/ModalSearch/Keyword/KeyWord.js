import React, { useState, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  handleModal,
  saveParamKeywordSearch,
  searchWithKeyword,
} from "../../../../redux/features/searchSlice";
import { useNavigate } from "react-router-dom";
import "./KeyWord.css";
const KeyWord = ({ text }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myCoords = useSelector((state) => state.persist.myCoords);
  const handleOnClickKeyword = (text) => {
    dispatch(saveParamKeywordSearch(text));

    dispatch(
      searchWithKeyword({
        param: text,
        // lon: myCoords.longitude,
        // lat: myCoords.latitude,
        lon: 106.6983125,
        lat: 10.7802256,
      })
    );
    navigate(`../SearchResult/${text}`);
    dispatch(handleModal({ openModalSearch2: false }));
  };
  console.log("myCoords", myCoords);
  return (
    <div className="KeyWordDiv" onClick={() => handleOnClickKeyword(text)}>
      <SearchIcon className="KeyWordDivIcon"></SearchIcon>
      <a>{text}</a>
    </div>
  );
};

export default KeyWord;
