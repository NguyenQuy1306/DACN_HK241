import React, { useState, useEffect } from "react";
import NextButton from "./NextButton/NextButton";
import ListImage from "./ListImage/ListImage";
import { getRestaurantById } from "../../../api/travelAdvisorAPI";

const ImageBox = () => {
  const location_id = localStorage.getItem("selectedPlaceId");
  const [selectedPlace, setSelectedPlace] = useState(
    getRestaurantById(location_id).then((data) => setSelectedPlace(data))
  );
  const photo = selectedPlace.length > 0 ? selectedPlace[0].photo : null;

  return (
    <div>
      <div
        style={{
          margin: "0px",
          paddingBottom: "calc(17.205%),",
          overflow: "hidden",
          position: "relative",
          //   height: "0px",
          backgroundColor: "rgb(249, 250, 250)",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            zIndex: "1",
            width: "1167px",
          }}
        >
          {/* next button */}
          adsasdasdasdasdasdasd
          <NextButton></NextButton>
          {/* list button: chạy vòng lặp rồi gọi call prop */}
          <ListImage selectedPlace={photo}></ListImage>
          {/* next button */}
        </div>
        <div> {/* button number of image */}</div>
      </div>
    </div>
  );
};

export default ImageBox;
