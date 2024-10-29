import React, { useState, useEffect } from "react";
import "./ListImage.css";
const ListImage = ({ selectedPlace }) => {
  return <div className="ListImage">{selectedPlace} </div>;
};

export default ListImage;
