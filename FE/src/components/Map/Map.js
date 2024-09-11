import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getPlacesData } from "../../api/travelAdvisorAPI"; // Adjust the path based on your file structure
import { Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import useStyles from "./styles";
import { useMediaQuery } from "@mui/material";

const Map = ({ setPlaces, setCoords, setChildClicked }) => {
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 55.42152967, lng: -57.6971931 });
  const classes = useStyles();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [highlightedMarkerIndex, setHighlightedMarkerIndex] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const isFirstLoad = useRef(true); // Track the initial load

  useEffect(() => {
    // Update center when coords change
    setCoords(center);
    setPlaces(markers);
  }, [center, markers, setCoords, setPlaces]);

  const handleFilterPlaces = async () => {
    if (bounds) {
      console.log("Fetching places with bounds: ", bounds);
      const { ne, sw } = bounds;
      try {
        const data = await getPlacesData("restaurants", sw, ne);

        if (data && Array.isArray(data)) {
          const transformedMarkers = data.map((place) => ({
            lat: parseFloat(place.latitude),
            lng: parseFloat(place.longitude),
            name: place.name,
            photo: place.photo,
            rating: place.rating,
            address: place.address,
            location_id: place.location_id,
          }));
          setMarkers(transformedMarkers);
          setPlaces(transformedMarkers);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  useEffect(() => {
    // Get user's current position only once on component mount
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isMapLoaded) {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsMapLoaded(true);
        }
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      }
    );
  }, [isMapLoaded]);

  useEffect(() => {
    const fetchFilteredPlaces = async () => {
      // Ensure bounds are set and component is not reloading
      if (isFirstLoad.current && bounds) {
        await handleFilterPlaces();
        isFirstLoad.current = false;
      }
    };

    fetchFilteredPlaces(); // Call the async function
  }, [bounds]); // Dependency on bounds only

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
  };

  return (
    <div className={classes.mapContainer}>
      <div>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={{
              width: "545px",
              height: "570px",
              position: "sticky",
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
                      ? "https://cdn-icons-png.flaticon.com/512/8095/8095096.png"
                      : "https://cdn-icons-png.flaticon.com/512/8095/8095099.png",
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
      <div className={classes.divfilterButton}>
        <Button
          onClick={handleFilterPlaces}
          sx={{
            position: "relative",
            textTransform: "uppercase",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            verticalAlign: "bottom",
            transition: "background-color 62.5ms, box-shadow 62.5ms",
            backgroundColor: "black",
            padding: "0.5rem 0.75rem",
            fontSize: "0.8125rem",
            fontWeight: 400,
            fontFamily: "RalewayX, arial, sans-serif",
            lineHeight: 1.38462,
            borderRadius: "9999px",
            whiteSpace: "nowrap",
            boxShadow: "rgba(0, 0, 0, 0.12) -0.0625rem 0.1875rem 0.375rem",
            color: "white",
            border: "1px solid rgb(90, 96, 108)",
          }}
        >
          <CachedIcon
            style={{
              fontSize: "100%",
              verticalAlign: "bottom",
              marginBottom: "3px",
              marginRight: "2px",
            }}
          ></CachedIcon>
          <span>Search in this area</span>
        </Button>
      </div>
    </div>
  );
};

export default Map;
