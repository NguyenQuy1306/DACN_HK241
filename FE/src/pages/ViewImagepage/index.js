import React, { useState } from "react";
import "./ViewImagepage.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ButtonFilter from "../../components/Filter/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
const ViewImagepage = () => {
  let navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(
    JSON.parse(localStorage.getItem("selectedPlace"))
  );
  console.log("selectedPlaceselectedPlace", selectedPlace);
  const allFoodUrlString = selectedPlace.danhSachAnhMenu;
  const allFoodUrl = allFoodUrlString ? allFoodUrlString : [];
  const [showImage, setShowImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnClickImage = (index) => {
    setCurrentIndex(index);
    setShowImage(allFoodUrl[index]);
  };

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

  const handleBackDetailPage = () => {
    const location_id = localStorage.getItem("selectedPlaceId");
    navigate(`/DetailRestaurant/${location_id}`);
  };

  return (
    <>
      <div>
        <div className="ViewImagepage_H1">
          <div className="ViewImagepage_H1_div">
            <div className="ViewImagepage_H1_div_div">
              <Button
                className="ViewImagepage_H1_div_div_button"
                onClick={() => handleBackDetailPage()}
              >
                <ArrowBackIosIcon className="ViewImagepage_H1_div_div_button_icon" />
              </Button>
              <h3 className="ViewImagepage_H1_div_div_h3">Tosca</h3>
            </div>
            <div className="ViewImagepage_H1_div_div_filter">
              <div className="ViewImagepage_H1_div_div_filter_H1"></div>
              <ButtonFilter text={`All (${allFoodUrl.length})`} />
              <ButtonFilter text="By restaurant" />
            </div>
          </div>
        </div>
        <div className="ViewImagepage_H2">
          <div className="ViewImagepage_H2_div">
            <div className="ViewImagepage_H2_div_div">
              <p className="ViewImagepage_H2_div_div_p">
                <span>Restaurant photos</span>
              </p>
              <div className="ViewImagepage_H2_div_div_listImage">
                {allFoodUrl.map((menuImage, index) => (
                  <div
                    key={index}
                    className="ViewImagepage_H2_div_div_listImage_divImage"
                    onClick={() => handleOnClickImage(index)}
                  >
                    <img
                      src={menuImage}
                      alt={`Menu ${index + 1}`}
                      className="ViewImagepage_H2_div_div_listImage_image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showImage && (
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
      )}
    </>
  );
};

export default ViewImagepage;
