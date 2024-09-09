import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles.js";

const PlaceDetails = ({ place, selected, refProp }) => {
  let navigate = useNavigate();

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const classes = useStyles();
  const handleClickDetailRestaurant = (id) => {
    console.log("location_id", id);
    localStorage.setItem("selectedPlaceId", id);
    navigate(`/DetailRestaurant/${id}`);
  };
  return (
    <div
      onClick={() => handleClickDetailRestaurant(place.location_id)}
      style={{
        background: "#fff",
        border: "1px solid #eaeaea",
        // padding: "10px",
        padding: "10px 0px 0px 10px",
        height: "200px",
        borderRadius: "15px",
        display: "flex",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <CardMedia
        style={{
          height: "180px",
          width: "180px",
          // background:'50%',
          backgroundColor: "#eaeaea",
          backgroundSize: "cover",
          borderRadius: "10px",
          flexShrink: 0,
          position: "relative",
        }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <div>
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
      </div>
    </div>
  );
};

export default PlaceDetails;
