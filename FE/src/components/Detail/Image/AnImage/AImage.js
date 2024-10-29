import React, { useState, useEffect } from "react";
import placeholderImage from "../../../../assets/images/nhin-ben-ngoai (1).jpg";

import "./AImage.css";
const AImage = (image) => {
  console.log("imageurlll::: ", image);
  return (
    <div className="div_AImage">
      <picture>
        <img
          className="image_AImage"
          src={
            image
              ? Object.values(image)
              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
          }
        />
      </picture>
    </div>
  );
};

export default AImage;
