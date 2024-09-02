import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getPlacesData } from '../../api/travelAdvisorAPI'; // Adjust the path based on your file structure
import { CssBaseline, Grid } from '@mui/material';
import { Button, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import Rating from '@mui/material/Rating';
import { useMediaQuery } from '@mui/material';

const Map = ({setPlaces,setCoords}) => {
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 45.42152967, lng: -75.6971931 });
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:100px)');

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
    setPlaces(markers)
  }, [setCoords,setPlaces]);
    

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
            const data = await getPlacesData('restaurants', sw, ne); // Change 'restaurants' to the type you want

            if (data && Array.isArray(data)) {
                const transformedMarkers = data.map(place => ({
                    lat: parseFloat(place.latitude),
                    lng: parseFloat(place.longitude),
                    name: place.name,
                    photo: place.photo,
                    rating: place.rating
                }));
                console.log("data ", data.length);
                console.log("transformedMarkers ", transformedMarkers.length);
                setMarkers(transformedMarkers);
                setPlaces(transformedMarkers)
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
    setCenter({ lat, lng });
  };
  return (
    <div className={classes.mapContainer}>
    
    <Button
        variant="contained"
        color="primary"
        onClick={handleFilterPlaces}
        className={classes.filterButton}
      >
        Search in this area
      </Button>
      
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '600px', height: '600px' }}
        zoom={13}
        center={center}
        mapId="DEMO_MAP_ID"
        onIdle={onMapIdle}
        margin={[50, 50, 50, 50]}
        onClick={onMapClick}  // Handle clicks to move the map center

        onLoad={map => (mapRef.current = map)}
        gestureHandling="greedy"  // Allows both scrolling and zooming
        onChange={(e) => {
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {markers.map((position, index) => (
          <Marker key={index} position={position} />

        ))}
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default Map;
