import React, { useState, useEffect, createRef } from "react";
import "./OtherInformation.css";
import OtherInformationComponent from "./Component/OtherInformationComponent";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
const OtherInformation = ({ selectedPlace }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
      <div className="OtherInformation_H1">
        <OtherInformationComponent
          icon={<LocationOnOutlinedIcon></LocationOnOutlinedIcon>}
          text={selectedPlace.diaChi}
          title={"Địa chỉ"}
        ></OtherInformationComponent>
        <OtherInformationComponent
          icon={<RestaurantOutlinedIcon></RestaurantOutlinedIcon>}
          text={"Ho Chi Minh"}
          title={"Khu vực"}
        ></OtherInformationComponent>
        <OtherInformationComponent
          icon={<LocalAtmOutlinedIcon></LocalAtmOutlinedIcon>}
          text={`${selectedPlace.khoangGia} VNĐ`}
          title={"Khoảng giá"}
        ></OtherInformationComponent>
      </div>
    </div>
  );
};
export default OtherInformation;
