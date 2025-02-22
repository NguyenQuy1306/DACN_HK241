import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useStyles from "./styles.js";
import "./PlaceDetailSearch.css";
import Tags from "../../features/Detail/DetailBox/Title/Tags/Tags.js";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import StarRating from "../PlaceDetails/StarRating/StarRating.js";
import { useDispatch, useSelector } from "react-redux";
import { setHoveredMarkerIndex } from "../../redux/features/restaurantSlice.js";
const PlaceDetailSearch = ({
  place,
  selected,
  refProp,
  restaurantsImageType,
  index,
}) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickDetailRestaurant = async (id) => {
    localStorage.setItem("selectedPlace", JSON.stringify(place));
    localStorage.setItem("selectedPlaceId", JSON.stringify(id));
    window.open("/DetailRestaurant/${id}", "_blank");
  };
  const [currentImages, setCurrentImages] = useState(
    restaurantsImageType.slice(0, 1)
  ); // hiển thị ảnh đầu tiên ban đầu

  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  const handleMouseOver = (index) => {
    dispatch(setHoveredMarkerIndex(index));
  };
  const handleMouseOut = () => {
    dispatch(setHoveredMarkerIndex(null));
  };
  const handleBooking = async (id) => {
    localStorage.setItem("selectedPlace", JSON.stringify(place));
    localStorage.setItem("selectedPlaceId", JSON.stringify(id));
    window.open("/DetailRestaurant/${id}", "_blank");
  };
  return (
    <div>
      <div
        onClick={() => handleClickDetailRestaurant(place.maSoNhaHang)}
        className="PlaceDetailSearch"
        onMouseOver={() => handleMouseOver(index)}
        onMouseOut={handleMouseOut}
      >
        <div className="PlaceDetailSearch_H1">
          <div className="PlaceDetailSearch_H1_div">
            <div className="PlaceDetailSearch_H1_div_div">
              <div className="PlaceDetailSearch_H1_div_div_listImage">
                {Object.values(currentImages).map((image, i) => {
                  return (
                    <div
                      className="PlaceDetailSearch_H1_div_div_listImage_boxImage"
                      key={i} // Ideally, use a unique id from the image if available
                    >
                      <picture>
                        <img
                          className="PlaceDetailSearch_H1_div_div_listImage_boxImage_image"
                          src={
                            image ||
                            "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                          }
                          alt={`Image ${i}`} // Ensure to provide a descriptive alt text
                        />
                      </picture>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="PlaceDetailSearch_H1_detail">
            <div>
              <div className="PlaceDetailSearch_H1_detail_listTag">
                <Tags></Tags>
                {/* {place.loaiHinh} */}
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
              </div>
              <div className="PlaceDetailSearch_H1_detail_name">
                <div className="PlaceDetailSearch_H1_detail_name_div1">
                  <div className="PlaceDetailSearch_H1_detail_name_div1_name">
                    <h2>
                      <a className="PlaceDetailSearch_H1_detail_name_div1_name_a">
                        {place.ten}
                      </a>
                    </h2>
                  </div>
                  <div className="PlaceDetailSearch_H1_detail_name_div1_div">
                    <StarRating
                      rating={2.6}
                      size={"15"}
                      classname={"y-css-35tusp"}
                    ></StarRating>
                    <div className="PlaceDetailSearch_H1_detail_rating">
                      {/* <span className="PlaceDetailSearch_H1_detail_rating_span1">
                    <span>4</span>
                    <StarBorderIcon className="PlaceDetailSearch_H1_detail_rating_span1_icon"></StarBorderIcon>
                  </span> */}
                      <span className="PlaceDetailSearch_H1_detail_rating_span2">
                        <ChatBubbleOutlineOutlinedIcon className="PlaceDetailSearch_H1_detail_rating_span2_icon"></ChatBubbleOutlineOutlinedIcon>
                        <span>123</span>
                      </span>
                    </div>
                  </div>
                  <p className="PlaceDetailSearch_H1_detail_name_div1_p">
                    {place.address}
                  </p>
                </div>
              </div>
              <p className="PlaceDetailSearch_H1_detail_p">
                {/* <span>Chỉ từ </span> */}
                <span className="PlaceDetailSearch_H1_detail_p123">
                  {place.khoangGia} đ/người
                </span>
              </p>
              <Button
                className="PlaceDetailSearch_H1_detail_p_button"
                onClick={() => handleBooking(place.maSoNhaHang)}
              >
                Đặt chỗ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailSearch;
