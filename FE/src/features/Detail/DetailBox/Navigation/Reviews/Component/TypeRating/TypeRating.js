import React, { useState, useEffect, createRef } from "react";
import "./TypeRating.css";
const TypeRating = ({ selectedPlace, text, rating }) => {
  return (
    <div className="TypeRatingDiv">
      <div className="TypeRatingDiv_H1">
        <div className="TypeRatingDiv_H1_point">
          <span className="TypeRatingDiv_H1_point_span1">
            <span>{rating}</span>
          </span>
          <span className="TypeRatingDiv_H1_point_span2">/10</span>
        </div>
        <p className="TypeRatingDiv_H1_point_p">
          <span>{text}</span>
        </p>
      </div>
    </div>
  );
};
export default TypeRating;
