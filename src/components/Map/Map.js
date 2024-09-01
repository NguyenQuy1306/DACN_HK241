import React, { useEffect, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import GoogleMapReact from 'google-map-react';
import { IoLocation } from "react-icons/io5";
import { useMediaQuery } from '@mui/material';
import useStyles from './styles.js';
import mapStyles from '../../mapStyles';
import { getPlacesData, getWeatherData } from '../../api/travelAdvisorAPI.js';
import { Box, Image, Text } from "@chakra-ui/react";
import PlaceIcon from '@mui/icons-material/Place';
import Marker from './Maker.js';
const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData,setPlaces,setRating  }) => {
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [mapBounds, setMapBounds] = useState({ ne: null, sw: null });
  const matches = useMediaQuery('(min-width:100px)');
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterPlaces = async () => {
    if (!mapBounds.ne || !mapBounds.sw) return;
  
    console.log("bound", mapBounds.sw, mapBounds.ne);
  
    setIsLoading(true); // Start loading
  
    try {
      console.log("new mapBounds.ne in handle: ", mapBounds.ne);
  
      // Lấy dữ liệu từ API
      const data = await getPlacesData('restaurants', mapBounds.sw, mapBounds.ne);
  
      // Xử lý dữ liệu
      const validPlaces = (data && Array.isArray(data))
        ? data.filter((place) => place.name && place.num_reviews > 0)
        : [];
  
      // Cập nhật trạng thái
      setPlaces(validPlaces);
      setFilteredPlaces(validPlaces);
      setShowFiltered(true);
      setRating(''); // Reset rating (if needed)
  
      // Log dữ liệu sau khi cập nhật
      console.log("Filtered Places: ", validPlaces.length);
      console.log("All Places: ", validPlaces.length);
  
    } catch (error) {
      console.error('Error fetching places data:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const Marker = ({ text }) => (
    <div style={{
      color: 'red',
      background: 'white',
      padding: '5px 10px',
      borderRadius: '50%',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
    }}>
      {text}
    </div>
  );
  const [mapKey, setMapKey] = useState(0);

  const refreshMap = () => {
    setMapKey((prevKey) => prevKey + 1); // Increment key to force re-render
  };
  
  return (
    <div className={classes.mapContainer}>
          <Button onClick={refreshMap}>Refresh Map</Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFilterPlaces}
        className={classes.filterButton}
      >
        Search in this area
      </Button>
      {places.length}
      ád
      ádsa
      <GoogleMapReact
  key={mapKey}
  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
  defaultCenter={coords}
  center={coords}
  defaultZoom={16}
  margin={[50, 50, 50, 50]}
  options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
  onChange={(e) => {
    setCoords({ lat: e.center.lat, lng: e.center.lng });
    setMapBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
    handleFilterPlaces();
  }}
  onChildClick={(child) => setChildClicked(child)}
>
  {filteredPlaces.length && filteredPlaces.map((place, i) => (
    <div
      className={classes.markerContainer}
      lat={(place.latitude)}
      lng={(place.longitude)}
      key={i}
    >
      {!matches
        ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
        : (
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
            <img
              className={classes.pointer}
              src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            />
            <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
          </Paper>
        )}
    </div>
  ))}
</GoogleMapReact>

    </div>
  );
};

export default Map;
