import React, { useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [coords, setCoords] = useState({
    lat: 10.77966437660912,
    lng: 106.66970825682756,
  });
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle place changes
  const onPlaceChanged = (autocomplete) => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: "69px",
            background: "#fff",
            borderBottom: "1px solid #eaeaea",
            // display: "block",
            position: "fixed",
            // top: 0,
            width: "100%",
            zIndex: 5,
          }}
        >
          {" "}
        </div>
        <div style={{ display: "flex", paddingTop: "69px" }}>
          {/* <CssBaseline /> */}
          <div style={{ width: "720px" }}>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              places={filteredPlaces.length ? filteredPlaces : places}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </div>
          <div>
            <Map
              setPlaces={setPlaces}
              setCoords={setCoords}
              setChildClicked={setChildClicked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
