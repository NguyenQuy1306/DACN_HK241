import React, { useState, useEffect } from "react";
import "./ListImage.css";
import { CardMedia } from "@mui/material";
import AImage from "./component/AnImage/AImage";
import images from "../../../../data/ImageData";
const ListImage = ({ place, startIndex, endIndex }) => {
  const images = place.danhSachAnhNhaHang
    ? place.danhSachAnhNhaHang.slice(startIndex, endIndex)
    : place.imageUrls.RESTAURANTIMAGE.slice(startIndex, endIndex);

  return (
    <div className="ListImage" aria-hidden="false">
      {images.map((image, i) => (
        <AImage image={image} />
      ))}
    </div>
  );
};

export default ListImage;
