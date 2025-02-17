import React, { useState, useEffect } from "react";

import KeyWord from "./Keyword/KeyWord";
import { Button, Modal, Box } from "@mui/material";
import PlaceDetailSearch from "../../PlaceDetailSearch/PlaceDetailSearch";
import "./ModalSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { searchKeyword } from "../../../redux/features/searchSlice";
const extractMatchingFragment = (text, keyword) => {
  let parts = text.split(/[,;]+/);
  for (let part of parts) {
    if (part.includes(keyword)) {
      return part.trim();
    }
  }
  return "";
};

const ModalSearch = ({ open }) => {
  const selectedPlace = JSON.parse(localStorage.getItem("selectedPlace"));
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.search.keyword);
  const paramketyword = useSelector((state) => state.search.paramKeyword);
  const keywords_conver =
    keywords.length > 0
      ? keywords.map((item) => {
          const monDacSacValue = item?.monDacSac[0] ? item.monDacSac[0] : "";
          return extractMatchingFragment(monDacSacValue, paramketyword);
        })
      : [];
  console.log("keyword", keywords);
  console.log("keywords_convernver", keywords_conver);
  return (
    // <Modal>
    <div className="ModalSearchDiv">
      <div className="ModalSearchDivWrapperSearch">
        <div className="ModalSearchDivWrapperSearch_KeyWord">
          <h4 className="ModalSearchDivWrapperSearch_KeyWord_header">
            Từ khoá
          </h4>
          <div className="ModalSearchDivWrapperSearch_KeyWord_listKeyWord">
            {keywords_conver
              .filter(Boolean)
              .slice(0, 6)
              .map((item) => (
                <KeyWord text={item}></KeyWord>
              ))}
          </div>
        </div>
        <div className="ModalSearchDivWrapperSearch_Recommendation">
          <h4 className="ModalSearchDivWrapperSearch_Recommendation_Header">
            Gợi ý
          </h4>
          <div className="ModalSearchDivWrapperSearch_Recommendation_listRecommendation">
            <PlaceDetailSearch
              place={selectedPlace}
              restaurantsImageType={
                selectedPlace.danhSachAnhNhaHang
                  ? selectedPlace.danhSachAnhNhaHang
                  : "https://via.placeholder.com/100"
              }
            >
              {" "}
            </PlaceDetailSearch>
            <PlaceDetailSearch
              place={selectedPlace}
              restaurantsImageType={
                selectedPlace.danhSachAnhNhaHang
                  ? selectedPlace.danhSachAnhNhaHang
                  : "https://via.placeholder.com/100"
              }
            >
              {" "}
            </PlaceDetailSearch>
          </div>
        </div>
      </div>
    </div>
    // </Modal>
  );
};

export default ModalSearch;
