import React, { useState, useEffect } from "react";

import KeyWord from "./Keyword/KeyWord";
import { Button, Modal, Box } from "@mui/material";
import PlaceDetailSearch from "../../PlaceDetailSearch/PlaceDetailSearch";
import "./ModalSearch.css";
const ModalSearch = ({ open }) => {
  const selectedPlace = JSON.parse(localStorage.getItem("selectedPlace"));
  console.log(selectedPlace);

  return (
    // <Modal>
    <div className="ModalSearchDiv">
      <div className="ModalSearchDivWrapperSearch">
        <div className="ModalSearchDivWrapperSearch_KeyWord">
          <h4 className="ModalSearchDivWrapperSearch_KeyWord_header">
            Từ khoá
          </h4>
          <div className="ModalSearchDivWrapperSearch_KeyWord_listKeyWord">
            <KeyWord text={"Lẩu"}></KeyWord>
            <KeyWord text={"Nướng"}></KeyWord>
            <KeyWord text={"Cơm"}></KeyWord>
            <KeyWord text={"Thái market"}></KeyWord>
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
