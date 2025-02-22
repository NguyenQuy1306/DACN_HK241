import React, { useState, useEffect } from "react";

import "./AImage.css";
const AImage = (image) => {
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
