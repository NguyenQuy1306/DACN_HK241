import React, { useState, useEffect, createRef } from "react";
import "./RestaurantName.css";

const RestaurantName = ({ selectedPlace }) => {
  return (
    <div className="RestaurantName">
      <h1>{selectedPlace.ten}</h1>

      <div className="show_count_rating">{selectedPlace.rating}</div>
    </div>
  );
};
export default RestaurantName;
