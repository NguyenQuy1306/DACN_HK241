import React, { useState, useEffect } from "react";

import KeyWord from "./Keyword/KeyWord";
import { Button, Modal, Box } from "@mui/material";

import "./ModalSearch.css";
const ModalSearch = ({ open }) => {
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
          <div className="ModalSearchDivWrapperSearch_Recommendation_listRecommendation"></div>
        </div>
      </div>
    </div>
    // </Modal>
  );
};

export default ModalSearch;
