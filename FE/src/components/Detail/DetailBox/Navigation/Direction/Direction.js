import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Marker from "./Maker";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CopyAddressButton from "./CopyAddressButton/CopyAddressButton";
import "./Direction.css";

const Direction = ({ selectedPlace }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB0PTO73Ngejljo-bJsJ0eq2K4z7Z79z-c",
  });

  const [showMarkers, setShowMarkers] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setShowMarkers(true);
    }
  }, [isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const places = [
    {
      id: 1,
      name: "Restaurant Example",
      latitude: selectedPlace.lat,
      longitude: selectedPlace.lng,
      photo: {
        images: {
          large: {
            url: "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
          },
        },
      },
    },
  ];
  const onMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

    window.open(googleMapsUrl, "_blank");
  };
  return (
    <div className="DirectionDiv">
      <h3 className="DirectionDiv_h3">Chỉ đường </h3>
      <div className="DirectionDiv_h1">
        <RoomOutlinedIcon className="DirectionDiv_h1_icon"></RoomOutlinedIcon>
        <div className="DirectionDiv_h1_div">
          <div className="DirectionDiv_h1_div_div">
            <span className="DirectionDiv_h1_div_span1">
              {selectedPlace.address}
            </span>{" "}
            <CopyAddressButton
              address={selectedPlace.address}
            ></CopyAddressButton>
          </div>
          <span className="DirectionDiv_h1_div_span2">
            (Nhấn vào ảnh bản đồ để xem chỉ đường, nhấn vào icon chia sẻ để chia
            sẻ vị trí cho mọi người)
          </span>
        </div>
      </div>
      <GoogleMap
        center={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onClick={onMapClick}
      >
        {showMarkers &&
          places.map((place) => (
            <Marker key={place.id} place={place} matches={false} />
          ))}
      </GoogleMap>
    </div>
  );
};

export default Direction;
