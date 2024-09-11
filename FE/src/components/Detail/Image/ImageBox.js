import React, { useState } from "react";
import NextButton from "./NextButton/NextButton";
import ListImage from "./ListImage/ListImage";
import images from "../../../data/ImageData";
import "./ImageBox.css";
const ImageBox = () => {
  const location_id = localStorage.getItem("selectedPlaceId"); // Retrieve location_id from localStorage
  const [selectedPlace, setSelectedPlace] = useState(
    JSON.parse(localStorage.getItem("selectedPlace"))
  );

  const [startIndex, setStartIndex] = useState(0);
  const imagesToShow = 3; // Number of images to display at once

  const handleNext = () => {
    if (startIndex + imagesToShow < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

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
          }}
        >
          {/* Previous button */}
          {startIndex > 0 && (
            <NextButton dimenson={true} onClick={handlePrevious} />
          )}

          {/* List of images */}
          <ListImage
            place={selectedPlace}
            startIndex={startIndex}
            endIndex={startIndex + imagesToShow}
          />

          {/* Next button */}
          {startIndex <= images.length - 4 && (
            <NextButton dimenson={false} onClick={handleNext} />
          )}
        </div>
      </div>
      <div className="number_image_h1">
        <div className="number_image_h2">
          <div className="number_image_h3">
            <div className="number_image_h4">
              <div className="number_image_h5">
                <span>{images.length} photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
