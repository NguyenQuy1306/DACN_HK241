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
const getSubStringWithKeyword = (inputString) => {
  if (!inputString.trim()) return "";

  const normalizedInput = inputString.toLowerCase();
  const words = normalizedInput.split(/\s+/);

  // Tìm vị trí đầu tiên của <em>
  const keywordIndex = words.findIndex((word) => word.includes("<em>"));

  if (keywordIndex === -1) {
    return ""; // Không tìm thấy <em>
  }

  // Loại bỏ HTML chỉ tại vị trí tìm được
  words[keywordIndex] = words[keywordIndex].replace(/<\/?[^>]+(>|$)/g, "");

  // Xác định số từ ngẫu nhiên trước và sau từ khóa
  const numWordsBefore = Math.floor(Math.random() * 3);
  const numWordsAfter = Math.floor(Math.random() * 3);

  const start = Math.max(0, keywordIndex - numWordsBefore);
  const end = Math.min(words.length, keywordIndex + numWordsAfter + 1);

  return words.slice(start, end).join(" ");
};

const inputString =
  "Sườn non bò Mỹ rút xương sốt Bulgogi, Dẻ sườn bò Mỹ <em>nướng</em> sốt bào ngư, Chóp vai bò Mỹ <em>nướng</em> sốt Shoyu";
const keyword = "nướng";

const result = getSubStringWithKeyword(inputString, keyword);
console.log("TiếnTiếnTiếnTiến ", result); // Ví dụ có thể trả về "Tiếp khách tại công"

const ModalSearch = ({ open }) => {
  const selectedPlace = JSON.parse(localStorage.getItem("selectedPlace"));
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.search.keyword);
  const paramketyword = useSelector((state) => state.search.paramKeyword);
  const format_keywordResult =
    keywords.length > 0
      ? keywords.map((item) => {
          let listTemp = [];
          if (item.ten.length > 0) {
            listTemp += item.ten[0];
            return listTemp;
          } else if (item.quan.length > 0) {
            listTemp += item.quan[0];
            return listTemp;
          } else if (item.monDacSac.length > 0) {
            listTemp += item.monDacSac[0];
            return listTemp;
          } else if (item.diemDacTrung.length > 0) {
            listTemp += item.diemDacTrung[0];
            return listTemp;
          } else if (item.moTaKhongGian.length > 0) {
            listTemp += item.moTaKhongGian[0];
            return listTemp;
          } else if (item.phuHop.length > 0) {
            listTemp += item.phuHop[0];
            return listTemp;
          }
          return listTemp;
        })
      : [];
  console.log("format_keywordResult:: ", format_keywordResult);
  const extractedResults = format_keywordResult
    .filter((item) => typeof item === "string" && item.trim() !== "") // Ensure valid strings
    .map((item) => getSubStringWithKeyword(item, paramketyword));
  console.log("extractedResults:: ", extractedResults);

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
            {extractedResults
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
