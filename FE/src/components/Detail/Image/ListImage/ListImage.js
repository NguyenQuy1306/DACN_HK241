import React from "react";
import "./ListImage.css";
import { CardMedia } from "@mui/material";
import AImage from "../AnImage/AImage";
import images from "../../../../data/ImageData";
const ListImage = ({ place, startIndex, endIndex }) => {
  const images2 = images.slice(startIndex, endIndex);

  return (
    <div className="ListImage" aria-hidden="false">
      {Object.values(images2).map((image, i) => (
        <AImage image={image.url} />
      ))}
    </div>
  );
};

export default ListImage;
