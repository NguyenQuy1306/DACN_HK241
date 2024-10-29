import React, { useState, useEffect, createRef } from "react";
import "./About.css";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

const About = ({ selectedPlace }) => {
  const restaurantData = {
    name: "Nhà hàng Cơm Niêu Sài Gòn - Hồ Xuân Hương",
    suitability: "KH văn phòng, gia đình, tụ hợp bạn bè, sinh nhật...",
    specialDishes: [
      "Bò Wagyu",
      "Thịt bò Yakiniku",
      "Heo Iberico",
      "Hải sản",
      "Sashimi",
      "Tempura",
    ],
    space: {
      architecture: "Kiến trúc ấm cúng, mang phong cách Nhật Bản",
      capacity: 100,
      floors: [
        { name: "Tầng 1", capacity: 50 },
        { name: "Tầng 2", capacity: 50 },
      ],
      privateRooms: {
        total: 4,
        description: "(5-10 khách/phòng)",
      },
    },
    additionalFacilities: ["wifi", "air condition", "parking"],
    openingHours: {
      monday: {
        lunch: "12:00 - 14:00",
        dinner: "19:00 - 21:45",
      },
      tuesday: {
        lunch: "12:00 - 14:00",
        dinner: "19:00 - 21:45",
      },
      wednesday: {
        lunch: "12:00 - 14:00",
        dinner: "19:00 - 21:45",
      },
      thursday: {
        lunch: "12:00 - 14:00",
        dinner: "19:00 - 21:45",
      },
      friday: {
        lunch: "12:00 - 14:00",
        dinner: "19:00 - 21:45",
      },
      saturday: {
        lunch: "12:00 - 14:00",
        dinner: "19:00 - 21:45",
      },
      sunday: {
        lunch: "12:00 - 14:00",
        dinner: "19:00 - 21:45",
      },
    },
    highlights:
      "Đầu bếp nhiều kinh nghiệm, từng phục vụ nội địa Nhật. Đa dạng món, hương vị nguyên bản Yakiniku, không gian đẹp",
  };
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const now = daysOfWeek[new Date().getDay()];
  return (
    <div className="AboutDiv">
      <h3 className="AboutDiv_h3">Chi tiết {selectedPlace.name}</h3>
      <div className="AboutDiv_H1">
        <div className="AboutDiv_H1_div">
          <div className="AboutDiv_H1_div_div1">
            <div className="AboutDiv_H1_div_div1_title">
              {" "}
              <div className="AboutDiv_H1_div_div1_title_icon">
                <WorkspacesOutlinedIcon className="AboutDiv_H1_div_div1_title_icon_css"></WorkspacesOutlinedIcon>
              </div>
              Phù hợp:
            </div>
            <div className="AboutDiv_H1_div_div1_description">
              <span> - {selectedPlace.phuHop}</span>
            </div>
            <div className="AboutDiv_H1_div_div1_title">
              <div className="AboutDiv_H1_div_div1_title_icon">
                <RestaurantMenuOutlinedIcon className="AboutDiv_H1_div_div1_title_icon_css"></RestaurantMenuOutlinedIcon>
              </div>
              Món đặc sắc:
            </div>
            <div className="AboutDiv_H1_div_div1_description">
              <span> - {selectedPlace.monDacSac}</span>
            </div>
            <div className="AboutDiv_H1_div_div1_title">
              <div className="AboutDiv_H1_div_div1_title_icon">
                <BusinessOutlinedIcon className="AboutDiv_H1_div_div1_title_icon_css"></BusinessOutlinedIcon>
              </div>
              Không gian:
            </div>
            <div className="AboutDiv_H1_div_div1_description12">
              {" "}
              <span>- {selectedPlace.moTaKhongGian} </span>
              {/* <span>- Sức chứa: {selectedPlace.space.capacity} Khách </span> */}
              {/* {selectedPlace.space.floors.map((floor, index) => (
                <span key={index}>
                  - {floor.name}: {floor.capacity} Khách{" "}
                </span>
              ))} */}
              <span>
                {/* - Phòng riêng: {selectedPlace.space.privateRooms.total} Phòng{" "}
                {selectedPlace.space.privateRooms.description} */}
              </span>
            </div>
            <div className="AboutDiv_H1_div_div1_title">
              <div className="AboutDiv_H1_div_div1_title_icon">
                <VerifiedOutlinedIcon className="AboutDiv_H1_div_div1_title_icon_css"></VerifiedOutlinedIcon>
              </div>
              Các tiện ích khác:
            </div>
            <div className="AboutDiv_H1_div_div1_description">
              {/* {restaurantData.additionalFacilities.map((service, index) => (
                <span key={index}>{service}, </span>
              ))} */}
            </div>
            <div className="AboutDiv_H1_div_div1_title">
              <div className="AboutDiv_H1_div_div1_title_icon">
                <AccessTimeOutlinedIcon className="AboutDiv_H1_div_div1_title_icon_css"></AccessTimeOutlinedIcon>
              </div>
              Giờ đóng và mở cửa:
            </div>
            <div className="AboutDiv_H1_div_div1_description">
              {" "}
              {/* {Object.entries(selectedPlace.openingHours).map(
                ([day, times], index) => (
                  <div
                    key={index}
                    // className="AboutDiv_H1_div_div1_description_div"
                    className={`AboutDiv_H1_div_div1_description_div ${
                      day === now ? "active" : ""
                    }`}
                  >
                    <div className="AboutDiv_H1_div_div1_description_div_date">
                      {day}
                    </div>
                    <div className="AboutDiv_H1_div_div1_description_div_lunch">
                      {times.lunch}
                      <span className="AboutDiv_H1_div_div1_description_div_lunch_div">
                        {" "}
                        •
                      </span>
                    </div>
                    <div className="AboutDiv_H1_div_div1_description_div_dinner">
                      {times.dinner}
                    </div>
                  </div>
                )
              )} */}
            </div>
            <div className="AboutDiv_H1_div_div1_title">
              {" "}
              <div className="AboutDiv_H1_div_div1_title_icon">
                <WhatshotOutlinedIcon className="AboutDiv_H1_div_div1_title_icon_css"></WhatshotOutlinedIcon>
              </div>
              Điểm đặc trưng:
            </div>
            <div className="AboutDiv_H1_div_div1_description">
              <span>{selectedPlace.diemDacTrung}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
