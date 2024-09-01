import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { Button, Paper, Typography } from '@mui/material';
import MapComponent from './Mycomponent';
const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({ lat: 10.77966437660912, lng: 106.66970825682756 });
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
  //     setCoords({ lat: latitude, lng: longitude });
  //   });
  // }, []);

  // useEffect(() => {
  //   if (places && Array.isArray(places)) {
  //     const filtered = places.filter((place) => Number(place.rating) > rating);
  //     setFilteredPlaces(filtered);
  //   }
  // }, [rating]);
  
  // useEffect(() => {
  //   console.log("bounds change")
  //   if (bounds) {
  //     setIsLoading(true);
  
  //     getWeatherData(coords.lat, coords.lng)
  //       .then((data) => setWeatherData(data));
  
  //     getPlacesData(type, bounds.sw, bounds.ne)
  //       .then((data) => {
  //         setPlaces((data && Array.isArray(data)) ? data.filter((place) => place.name && place.num_reviews > 0) : []);
  //         setFilteredPlaces([]);
  //         setRating('');
  //         setIsLoading(false);
  //       });
  //   }
  // }, [bounds, type]);
  const handleFilterPlaces = async () => {
    try {
      setIsLoading(true);
  
      // Gọi API để lấy dữ liệu mới
      const data = await getPlacesData(type, bounds.sw, bounds.ne);
      console
      // Cập nhật danh sách places với dữ liệu mới
      setPlaces((data && Array.isArray(data)) ? data.filter((place) => place.name && place.num_reviews > 0) : []);
  
      // Làm trống danh sách filteredPlaces và các giá trị khác
      setFilteredPlaces([]);
      setRating('');
      console.log('places', places.length);

    } catch (error) {
      console.error('Error fetching places data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <MapComponent></MapComponent>
      {/* <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} /> */}
      {/* <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Button
        variant="contained"
        color="primary"
        onClick={handleFilterPlaces}
      >
        Search in this area
      </Button>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
            setPlaces={setPlaces}
            setRating ={setRating }
          />
        </Grid>
      </Grid> */}
    </>
  );
};

export default App;
