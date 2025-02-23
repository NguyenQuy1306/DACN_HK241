import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsInMaps,
  saveBounds,
  saveCurrentPage,
  setHoveredMarkerIndex,
} from "../../redux/features/restaurantSlice";
import { saveMyCoords } from "../../redux/features/searchSlice";
const Map = ({ setPlaces, setCoords, setChildClicked }) => {
  const dispatch = useDispatch();
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 10.776823, lng: 106.697816 });
  const classes = useStyles();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [highlightedMarkerIndex, setHighlightedMarkerIndex] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const isFirstLoad = useRef(true); // Track the initial load

  const data_restaurantsInMaps = useSelector(
    (state) => state.restaurant.restaurants
  );

  useEffect(() => {
    // Update center when coords change
    setCoords(center);
    setPlaces(markers);
  }, [center, markers, setCoords, setPlaces]);

  const handleFilterPlaces = async () => {
    if (bounds) {
      const { ne, sw } = bounds;
      try {
        // Dispatch action to fetch restaurant data
        dispatch(saveCurrentPage(0));

        dispatch(
          getRestaurantsInMaps({
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
            page: 0,
            size: 10,
          })
        );
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
            lat: 10.776823,
            lng: 106.697816,
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
    // Transform and set markers whenever data_restaurantsInMaps changes
    if (data_restaurantsInMaps && Array.isArray(data_restaurantsInMaps)) {
      const transformedMarkers = data_restaurantsInMaps.map((place) => ({
        lat: parseFloat(place.viDo) || 0,
        lng: parseFloat(place.kinhDo) || 0,
        name: place.ten,
        photo: place.photo || null,
        rating: place.rating || null,
        address: place.diaChi,
        khoangGia: place.khoangGia,
        gioHoatDong: place.gioHoatDong,
        monDacSac: place.monDacSac,
        diemDacTrung: place.diemDacTrung,
        moTaKhongGian: place.moTaKhongGian,
        loaiHinh: place.loaiHinh,
        url: place.url,
        phuHop: place.phuHop,
        maSoNhaHang: place.maSoNhaHang,
        danhSachAnhNhaHang: place.imageUrls.RESTAURANTIMAGE,
        danhSachAnhMenu: place.imageUrls.MENUIMAGE,
      }));
      setMarkers(transformedMarkers);
      setPlaces(transformedMarkers);
    }
  }, [data_restaurantsInMaps, setPlaces]);

  useEffect(() => {
    const fetchFilteredPlaces = async () => {
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
      dispatch(saveBounds({ ne, sw }));
    }
  };

  const onMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedMarker(null); // Hide the info window when the map is clicked
    setHighlightedMarkerIndex(null);
  };
  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = (map) => {
    setMapLoaded(true);
    mapRef.current = map;
  };
  const onChildClick = (position, index) => {
    setChildClicked(index);
    setSelectedMarker(position);
    setCenter({ lat: position.lat, lng: position.lng });
    setHighlightedMarkerIndex(index); // Set the highlighted marker index
  };
  const hoveredMarkerIndex = useSelector(
    (state) => state.restaurant.hoveredMarkerIndex
  );
  const handleMouseOver = (index) => {
    dispatch(setHoveredMarkerIndex(index));
  };
  const handleMouseOut = () => {
    dispatch(setHoveredMarkerIndex(null));
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
              height: "610px",
              position: "sticky",
              overflow: "hidden",
            }}
            zoom={13}
            center={center}
            mapId="DEMO_MAP_ID"
            onIdle={onMapIdle}
            onClick={onMapClick}
            onLoad={onMapLoad}
            gestureHandling="greedy"
          >
            {markers.map((position, index) => (
              <Marker
                key={index}
                position={position}
                icon={{
                  className: classes.pointer,
                  url:
                    hoveredMarkerIndex === index ||
                    highlightedMarkerIndex === index
                      ? "https://cdn-icons-png.flaticon.com/512/8095/8095096.png"
                      : "https://cdn-icons-png.flaticon.com/512/8095/8095099.png",
                  scaledSize:
                    hoveredMarkerIndex === index ||
                    highlightedMarkerIndex === index
                      ? new window.google.maps.Size(70, 70)
                      : new window.google.maps.Size(45, 45),
                }}
                onClick={() => onChildClick(position, index)} // Corrected line
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={
                    selectedMarker.danhSachAnhNhaHang
                      ? selectedMarker.danhSachAnhNhaHang[0]
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
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderTop: "12px solid white",
                    bottom: "-11px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
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
            display: "flex",
          }}
          startIcon={
            <CachedIcon
              style={{
                fontSize: "100%",
                verticalAlign: "bottom",
                marginRight: "0px",
              }}
            ></CachedIcon>
          }
          variant="contained"
          color="primary"
        >
          <span>Tìm địa điểm</span>
        </Button>
      </div>
    </div>
  );
};

export default Map;
