import React from "react";
import "./Classification.css";

const Classification = ({ selectedPlace, text, rating }) => {
  return (
    <div className="ClassificationDiv">
      <div className="ClassificationDiv_H1">
        <p className="ClassificationDiv_H1_p">{text}</p>
      </div>
      <div className="ClassificationDiv_H2">
        <div
          className="ClassificationDiv_H2_div"
          style={{ width: `${rating}%` }} // Set the width dynamically based on the rating
        ></div>
      </div>
    </div>
  );
};

export default Classification;
