import React from "react";
import "./ListImage.css";
import { CardMedia } from "@mui/material";

const ListImage = ({ place }) => {
  return (
    <div className="ListImage">
      {console.log("place in list", place.photo.images.large.url)}
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
    </div>
  );
};

export default ListImage;
