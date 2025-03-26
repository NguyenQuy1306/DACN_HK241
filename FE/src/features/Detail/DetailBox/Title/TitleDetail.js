import React, { useState } from "react";
import "./TitleDetail.css";
import Tags from "./Tags/Tags";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RestaurantName from "./RestaurantName/RestaurantName";
import OtherInformation from "./OtherInformation/OtherInformation";
import PositionInTop from "./PositionInTop/PositionInTop";
const TitleDetail = ({ selectedPlace }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited); // Toggle favorited state
  };

  return (
    <div className="TitleDetail_H1">
      <div className="TitleDetail_H2">
        {/* 4 component: tags -> name -> */}
        <Tags />
        <div className="heart_favorite">
          {isFavorited ? (
            <FavoriteRoundedIcon
              className="heart_favorite_button_icon1"
              onClick={handleFavoriteClick}
            />
          ) : (
            <FavoriteBorderRoundedIcon
              className="heart_favorite_button_icon"
              onClick={handleFavoriteClick}
            />
          )}
        </div>
        <RestaurantName selectedPlace={selectedPlace}></RestaurantName>
        <OtherInformation selectedPlace={selectedPlace}></OtherInformation>
        <PositionInTop text={selectedPlace.loaiHinh}></PositionInTop>
      </div>
    </div>
  );
};

export default TitleDetail;
