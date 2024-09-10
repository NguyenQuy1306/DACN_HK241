import React, { useState, useEffect } from "react";
import NextButton from "./NextButton/NextButton";
import ListImage from "./ListImage/ListImage";
import { getRestaurantById } from "../../../api/travelAdvisorAPI";

const ImageBox = () => {
  const location_id = localStorage.getItem("selectedPlaceId"); // Retrieve location_id from localStorage
  const [selectedPlace, setSelectedPlace] = useState(
    JSON.parse(localStorage.getItem("selectedPlace"))
  );

  return (
    <div>
      <div
        style={{
          margin: "0px",
          paddingBottom: "calc(17.205%),",
          overflow: "hidden",
          position: "relative",
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
          {/* Next button */}
          <NextButton />
          {/* List of images, pass selectedPlace[0] as prop */}
          <ListImage place={selectedPlace} />
        </div>
        <div>{/* Button number of images */}</div>
      </div>
    </div>
  );
};

export default ImageBox;
