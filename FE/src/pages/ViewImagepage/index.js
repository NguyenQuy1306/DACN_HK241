import React, { useState } from "react";
import "./ViewImagepage.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ButtonFilter from "../../components/Filter/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import ModalViewImage from "../../components/Modal/ModalViewImage/ModalViewImage";
const ViewImagepage = () => {
  let navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(
    JSON.parse(localStorage.getItem("selectedPlace"))
  );
  const allFoodUrlString = selectedPlace.danhSachAnhMenu;
  const allFoodUrl = allFoodUrlString ? allFoodUrlString : [];
  const [showImage, setShowImage] = useState("");

  const handleBackDetailPage = () => {
    const location_id = localStorage.getItem("selectedPlaceId");
    navigate(`/DetailRestaurant/${location_id}`);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnClickImage = (index) => {
    setCurrentIndex(index);
    setShowImage(allFoodUrl[index]);
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
        <ModalViewImage
          showImage={showImage}
          allFoodUrl={allFoodUrl}
          setShowImage={setShowImage}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></ModalViewImage>
      )}
    </>
  );
};

export default ViewImagepage;
