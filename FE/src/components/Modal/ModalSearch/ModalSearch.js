import React, { useState, useEffect } from "react";

import KeyWord from "./Keyword/KeyWord";
import { Button, Modal, Box } from "@mui/material";
import PlaceDetailSearch from "../../PlaceDetailSearch/PlaceDetailSearch";
import "./ModalSearch.css";
import { useDispatch, useSelector } from "react-redux";
import {
  openModalSearch2,
  searchKeyword,
} from "../../../redux/features/searchSlice";
import { calculateDistance } from "../../../pages/SearchResult";
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
  const extractedResults = format_keywordResult
    .filter((item) => typeof item === "string" && item.trim() !== "") // Ensure valid strings
    .map((item) => getSubStringWithKeyword(item, paramketyword));

  const keywords_conver =
    keywords.length > 0
      ? keywords.map((item) => {
          const monDacSacValue = item?.monDacSac[0] ? item.monDacSac[0] : "";
          return extractMatchingFragment(monDacSacValue, paramketyword);
        })
      : [];
  const restaurantSearch = useSelector(
    (state) => state.search.restaurantsSearch
  );
  const openOf2 = useSelector(openModalSearch2);
  const [temp_restaurantSearch, setTempRestaurantSearch] = useState([]);

  useEffect(() => {
    if (openOf2) {
      setTempRestaurantSearch(restaurantSearch.slice());
    }
  }, [openOf2, restaurantSearch]);

  // Sort restaurants by distance
  const sortedRestaurants = [...temp_restaurantSearch].sort((a, b) => {
    const distanceA =
      calculateDistance(
        { longitude: 106.6983125, latitude: 10.7802256 },
        { lat: a.viDo, lng: a.kinhDo }
      ) || Infinity;
    const distanceB =
      calculateDistance(
        { longitude: 106.6983125, latitude: 10.7802256 },
        { lat: b.viDo, lng: b.kinhDo }
      ) || Infinity;
    return distanceA - distanceB; // Sort ascending
  });
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
            {sortedRestaurants.map((item, i) => (
              <PlaceDetailSearch
                index={i}
                place={item}
                restaurantsImageType={
                  item.imageUrls.RESTAURANTIMAGE
                    ? item.imageUrls.RESTAURANTIMAGE
                    : "https://via.placeholder.com/100"
                }
              ></PlaceDetailSearch>
            ))}
          </div>
        </div>
      </div>
    </div>
    // </Modal>
  );
};

export default ModalSearch;
