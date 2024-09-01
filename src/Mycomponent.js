import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getPlacesData } from './api/travelAdvisorAPI'; // Adjust the path based on your file structure

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 45.42152967, lng: -75.6971931 });

  useEffect(() => {
    const fetchMarkers = async () => {
      if (bounds) {
        console.log("bounds ", bounds)
        const { ne, sw } = bounds;
        try {
          const data = await getPlacesData('restaurants', sw, ne); // Change 'restaurants' to the type you want

          if (data && Array.isArray(data)) {
            setMarkers(data.map(place => ({
              lat: parseFloat(place.latitude), // Ensure these fields match the API response structure
              lng: parseFloat(place.longitude),
            })));
            console.log("markers ", markers)
          } else {
            console.error("Data format is not an array:", data);
          }
        } catch (error) {
          console.error("Error fetching places data:", error);
        }
      }
    };

    fetchMarkers();
  }, [bounds]);

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
    <LoadScript googleMapsApiKey="AIzaSyCZzdOt6vs6eOyEeFmE4IiJoDAIlWCk7H0">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        zoom={5}
        center={center}
        mapId="DEMO_MAP_ID"
        onIdle={onMapIdle}
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
  );
};

export default MapComponent;
