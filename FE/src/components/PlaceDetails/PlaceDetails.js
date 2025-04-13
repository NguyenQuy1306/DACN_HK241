import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useStyles from "./styles.js";
import "./PlaceDetails.css";
// import images from "../../data/ImageData.js";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Tags from "../../features/Detail/DetailBox/Title/Tags/Tags.js";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import StarRating from "./StarRating/StarRating.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setHoveredMarkerIndex,
  trackUserBehavior,
} from "../../redux/features/restaurantSlice";
import { motion } from "framer-motion";
const PlaceDetails = ({
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
  const user = useSelector((state) => state.authentication.user);
  const handleClickDetailRestaurant = async (id) => {
    localStorage.setItem("selectedPlace", JSON.stringify(place));
    localStorage.setItem("selectedPlaceId", JSON.stringify(id));
    if (user) {
      dispatch(
        trackUserBehavior({
          restaurantId: id,
          userId: user.maSoNguoiDung,
          timestamp: new Date().toISOString(),
        })
      );
    }

    window.open("/DetailRestaurant/${id}", "_blank");
  };
  const [startIndex, setStartIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState(
    restaurantsImageType.slice(0, 1)
  ); // hiển thị ảnh đầu tiên ban đầu
  const imagesToShow = 1; // Số lượng ảnh hiển thị

  // Cập nhật danh sách ảnh khi startIndex thay đổi
  useEffect(() => {
    setCurrentImages(
      restaurantsImageType.slice(startIndex, startIndex + imagesToShow)
    );
  }, [startIndex, imagesToShow]);

  const handleNext = (e) => {
    e.stopPropagation();
    if (startIndex + imagesToShow < restaurantsImageType.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
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
  return (
    <div>
      <motion.div
        onClick={() => handleClickDetailRestaurant(place.maSoNhaHang)}
        className="PlaceDetailDiv"
        onMouseOver={() => handleMouseOver(index)}
        onMouseOut={handleMouseOut}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="PlaceDetailDiv_H1">
          <div className="PlaceDetailDiv_H1_div">
            <div className="PlaceDetailDiv_H1_div_div">
              {startIndex > 0 && (
                <Button
                  className="PlaceDetailDiv_H1_div_div_button1"
                  onClick={handlePrevious}
                >
                  <NavigateBeforeIcon className="PlaceDetailDiv_H1_div_div_button2_icon"></NavigateBeforeIcon>
                </Button>
              )}

              <div className="PlaceDetailDiv_H1_div_div_listImage">
                {Object.values(currentImages).map((image, i) => {
                  return (
                    <div
                      className="PlaceDetailDiv_H1_div_div_listImage_boxImage"
                      key={i} // Ideally, use a unique id from the image if available
                    >
                      <picture>
                        <img
                          className="PlaceDetailDiv_H1_div_div_listImage_boxImage_image"
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

              {startIndex <= restaurantsImageType.length - 2 && (
                <Button
                  className="PlaceDetailDiv_H1_div_div_button2"
                  onClick={handleNext}
                >
                  {/* <span className="PlaceDetailDiv_H1_div_div_button2_span"></span> */}
                  <NavigateNextIcon className="PlaceDetailDiv_H1_div_div_button2_icon"></NavigateNextIcon>
                </Button>
              )}
            </div>
            <div className="PlaceDetailDiv_H1_div_index">{index + 1}</div>
          </div>
          <div className="PlaceDetailDiv_H1_detail">
            <div>
              <div className="PlaceDetailDiv_H1_detail_listTag">
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
              <div className="PlaceDetailDiv_H1_detail_name">
                <div className="PlaceDetailDiv_H1_detail_name_div1">
                  <div className="PlaceDetailDiv_H1_detail_name_div1_name">
                    <h2>
                      <a className="PlaceDetailDiv_H1_detail_name_div1_name_a">
                        {place.ten}
                      </a>
                    </h2>
                  </div>
                  <div className="PlaceDetailDiv_H1_detail_name_div1_div">
                    <StarRating
                      rating={2.6}
                      size={"20"}
                      classname={"y-css-35tusp"}
                    ></StarRating>
                    <div className="PlaceDetailDiv_H1_detail_rating">
                      {/* <span className="PlaceDetailDiv_H1_detail_rating_span1">
                    <span>4</span>
                    <StarBorderIcon className="PlaceDetailDiv_H1_detail_rating_span1_icon"></StarBorderIcon>
                  </span> */}
                      <span className="PlaceDetailDiv_H1_detail_rating_span2">
                        <ChatBubbleOutlineOutlinedIcon className="PlaceDetailDiv_H1_detail_rating_span2_icon"></ChatBubbleOutlineOutlinedIcon>
                        <span>123</span>
                      </span>
                    </div>
                  </div>
                  <p className="PlaceDetailDiv_H1_detail_name_div1_p">
                    {place.diaChi}
                  </p>
                </div>
              </div>
              <p className="PlaceDetailDiv_H1_detail_p">
                {/* <span>Chỉ từ </span> */}
                <span className="PlaceDetailDiv_H1_detail_p123">
                  {place.khoangGia} đ/người
                </span>
              </p>
            </div>
            <p className="">{place.loaiHinh}</p>
          </div>
        </div>
        {/* 
        <div className="PlaceDetailDiv_H2">
          <CardContent style={{ height: "250px" }}>
            <Typography
              className="title_card"
              gutterBottom
              variant="h5"
              style={{
                color: "#2a2a2a",
                fontSize: "18px",
                letterSpacing: "-0.25px",
                lineHeight: 1.33,
                overflow: "hidden",
                textDecoration: "none",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: "700",
                fontFamily:
                  "Beatrice, GT America, Helvetica, Verdana, sans-serif",
              }}
            >
              {place.name}
            </Typography>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Rating name="read-only" value={Number(place.rating)} readOnly />
              <Typography component="legend">
                {place.num_reviews} review{place.num_reviews > 1 && "s"}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography component="legend">Price</Typography>
              <Typography gutterBottom variant="subtitle1">
                {place.price_level}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography component="legend">Ranking</Typography>
              <Typography gutterBottom variant="subtitle1">
                {place.ranking}
              </Typography>
            </Box>
            {place?.awards?.map((award) => (
              <Box
                display="flex"
                justifyContent="space-between"
                my={1}
                alignItems="center"
              >
                <img src={award.images.small} />
                <Typography variant="subtitle2" color="textSecondary">
                  {award.display_name}
                </Typography>
              </Box>
            ))}
            {place?.cuisine?.map(({ name }) => (
              <Chip
                key={name}
                size="small"
                label={name}
                className={classes.chip}
              />
            ))}
            {place.address && (
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                className={classes.subtitle}
              >
                <LocationOnIcon />
                {place.address}
              </Typography>
            )}
            {place.phone && (
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.spacing}
              >
                <PhoneIcon /> {place.phone}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.web_url, "_blank")}
            >
              Trip Advisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.website, "_blank")}
            >
              Website
            </Button>
          </CardActions>
        </div> */}
      </motion.div>
    </div>
  );
};

export default PlaceDetails;
