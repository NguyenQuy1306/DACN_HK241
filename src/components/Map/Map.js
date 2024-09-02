import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { getPlacesData } from "../../api/travelAdvisorAPI"; // Adjust the path based on your file structure
import { CssBaseline, Grid } from "@mui/material";
import { Button, Paper, Typography } from "@mui/material";
import useStyles from "./styles";
import Rating from "@mui/material/Rating";
import { useMediaQuery } from "@mui/material";

const Map = ({ setPlaces, setCoords, setChildClicked }) => {
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 45.42152967, lng: -75.6971931 });
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:100px)");
  const [selectedMarker, setSelectedMarker] = useState(null); // To store the selected marker
  const [highlightedMarkerIndex, setHighlightedMarkerIndex] = useState(null);

  // useEffect(() => {
  //   const fetchMarkers = async () => {
  //     if (bounds) {
  //       console.log("bounds ", bounds)
  //       const { ne, sw } = bounds;
  //       try {
  //         const data = await getPlacesData('restaurants', sw, ne); // Change 'restaurants' to the type you want

  //         if (data && Array.isArray(data)) {
  //           setMarkers(data.map(place => ({
  //             lat: parseFloat(place.latitude), // Ensure these fields match the API response structure
  //             lng: parseFloat(place.longitude),
  //           })));
  //           console.log("markers ", markers)
  //         } else {
  //           console.error("Data format is not an array:", data);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching places data:", error);
  //       }
  //     }
  //   };
  useEffect(() => {
    // Update center when coords change
    setCoords(center);
    setPlaces(markers);
  }, [setCoords, setPlaces]);

  useEffect(() => {
    // Get user's current position on component mount
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
        // Optional: Handle the error, e.g., use a fallback location
      }
    );
  }, []);

  const handleFilterPlaces = async () => {
    if (bounds) {
      console.log("bounds ", bounds);
      const { ne, sw } = bounds;
      try {
        const data = await getPlacesData("restaurants", sw, ne); // Change 'restaurants' to the type you want

        if (data && Array.isArray(data)) {
          const transformedMarkers = data.map((place) => ({
            lat: parseFloat(place.latitude),
            lng: parseFloat(place.longitude),
            name: place.name,
            photo: place.photo,
            rating: place.rating,
            address: place.address,
          }));
          console.log("data ", data.length);
          console.log("transformedMarkers ", transformedMarkers.length);
          setMarkers(transformedMarkers);
          setPlaces(transformedMarkers);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  const onMapIdle = () => {
    const map = mapRef.current;
    if (map) {
      const ne = map.getBounds().getNorthEast().toJSON();
      const sw = map.getBounds().getSouthWest().toJSON();
      setBounds({ ne, sw });
    }
  };
  const onMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    // setCenter({ lat, lng });
    setSelectedMarker(null); // Hide the info window when the map is clicked
    setHighlightedMarkerIndex(null);
  };
  const onChildClick = (position, index) => {
    setChildClicked(index);
    setSelectedMarker(position);
    const lat = position.lat;
    const lng = position.lng;
    setCenter({ lat, lng });
    setHighlightedMarkerIndex(index); // Set the highlighted marker index

    console.log("nguyenasdasd");
  };
  return (
    <div className={classes.mapContainer}>
      {/* {selectedMarker.name} */}

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterPlaces}
          className={classes.filterButton}
        >
          Search in this area
        </Button>
      </div>
      <div>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={{
              width: "445px",
              height: "548px",
              position: "fixed",
              overflow: "hidden",
            }}
            zoom={13}
            center={center}
            mapId="DEMO_MAP_ID"
            onIdle={onMapIdle}
            margin={[50, 50, 50, 50]}
            onClick={onMapClick} // Handle clicks to move the map center
            onLoad={(map) => (mapRef.current = map)}
            gestureHandling="greedy" // Allows both scrolling and zooming
            onChange={(e) => {
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
            }}
          >
            {markers.map((position, index) => (
              <Marker
                key={index}
                position={position}
                icon={{
                  className: classes.pointer,
                  url:
                    highlightedMarkerIndex === index
                      ? "https://cdn-icons-png.flaticon.com/512/5193/5193674.png"
                      : "https://cdn-icons-png.flaticon.com/512/5193/5193679.png",
                  scaledSize:
                    highlightedMarkerIndex === index
                      ? new window.google.maps.Size(70, 70)
                      : new window.google.maps.Size(45, 45),
                }}
                // onClick={setChildClicked(index)}
                onClick={() => onChildClick(position, index)} // Corrected line
              />
            ))}
            {selectedMarker && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "20%",
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  zIndex: 100,
                  minWidth: "180px",
                  height: "200px",

                  textAlign: "center",
                  // position: 'relative', // This is required for the pseudo-element
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={
                    selectedMarker.photo
                      ? selectedMarker.photo.images.large.url
                      : "https://via.placeholder.com/100"
                  }
                  alt={selectedMarker.name}
                  style={{ width: "100%", height: "70%", borderRadius: "4px" }}
                />
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      maxWidth: "230px",
                      marginRight: "5px",
                    }}
                  >
                    {selectedMarker.name}
                  </div>
                  ★ {selectedMarker.rating}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "inherit",
                    // whiteSpace: 'nowrap',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {selectedMarker.address}
                </div>

                {/* Tip of the talk bubble */}
                <div
                  style={{
                    content: "''",
                    position: "absolute",
                    width: "0",
                    height: "0",
                    borderLeft: "15px solid transparent",
                    borderRight: "15px solid transparent",
                    borderTop: "17px solid white",
                    bottom: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)", // Optional: Add a slight shadow to the tip
                  }}
                ></div>
              </div>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Map;
