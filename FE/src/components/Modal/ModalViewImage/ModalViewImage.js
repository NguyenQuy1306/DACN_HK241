import React, { useState } from "react";
import "../../../pages/ViewImagepage/ViewImagepage.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
const ModalViewImage = ({
  showImage,
  allFoodUrl,
  setShowImage,
  currentIndex,
  setCurrentIndex,
}) => {
  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % allFoodUrl.length;
    setCurrentIndex(nextIndex);
    setShowImage(allFoodUrl[nextIndex]);
  };

  const handlePreviousImage = () => {
    const prevIndex =
      (currentIndex - 1 + allFoodUrl.length) % allFoodUrl.length;
    setCurrentIndex(prevIndex);
    setShowImage(allFoodUrl[prevIndex]);
  };

  const handleCloseDetailView = () => {
    setShowImage("");
  };
  return (
    <div className="viewDetailPhoto">
      <div className="viewDetailPhoto_h1">
        <div className="viewDetailPhoto_h2">
          <section className="viewDetailPhoto_h2_section">
            <div className="viewDetailPhoto_h2_section_div">
              <div className="viewDetailPhoto_h2_section_div_div">
                <p className="viewDetailPhoto_h2_section_div_div_p">
                  <span>
                    {currentIndex + 1} of {allFoodUrl.length}
                  </span>
                </p>
                <Button
                  className="viewDetailPhoto_h2_section_div_div_button"
                  onClick={handleCloseDetailView}
                >
                  <CloseIcon className="viewDetailPhoto_h2_section_div_div_button_icon" />
                </Button>
                <div className="viewDetailPhoto_h2_section_div_div_h1">
                  <div className="viewDetailPhoto_h2_section_div_div_h2">
                    <span className="viewDetailPhoto_h2_section_div_div_h2_span">
                      <img
                        src={showImage}
                        alt={`Menu ${currentIndex + 1}`}
                        className="viewDetailPhoto_h2_section_div_div_h2_image"
                      />
                    </span>
                  </div>
                  <Button
                    className="viewDetailPhoto_h2_section_div_div_h1_button1"
                    onClick={handlePreviousImage}
                  >
                    <ArrowBackIosIcon className="viewDetailPhoto_h2_section_div_div_h1_button1_icon" />
                  </Button>
                  <Button
                    className="viewDetailPhoto_h2_section_div_div_h1_button2"
                    onClick={handleNextImage}
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModalViewImage;
