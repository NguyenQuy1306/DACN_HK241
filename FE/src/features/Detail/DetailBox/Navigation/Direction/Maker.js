import React from "react";
import { Marker as GoogleMarker } from "@react-google-maps/api";

const Marker = ({ place }) => {
  return (
    <GoogleMarker
      position={{ lat: place.latitude, lng: place.longitude }}
      title={place.name}
    />
  );
};

export default Marker;
