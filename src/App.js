import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Reservation from "./components/Dropdown/Reservation";
import Filter from "./components/Filter/Filter";
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
            height: "32px",
            background: "hsl(180, 9%, 98%)",
            display: "block",
            // top: 0,
            width: "100%",
            zIndex: 5,
          }}
        >
          123123ád
        </div>
        <div
          style={{
            height: "72px",
            background: "hsl(180, 9%, 98%)",
            display: "block",
            // top: 0,
            width: "100%",
            zIndex: 10,
          }}
        >
          ádsdsssssadasd
        </div>
        <div
          style={{
            height: "68px",
            background: "white",
            borderBottom: "1px solid #eaeaea",
            display: "block",
            position: "sticky",
            width: "100%",
            zIndex: 15,
            top: "0",
            boxShadow: "-0.0625rem 0.1875rem 0.375rem hsla(0, 0%, 0%, 0.12)",
          }}
        >
          <div
            style={{
              listStyleType: "none",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "1rem",
              maxWidth: "80rem",
            }}
          >
            <div
              style={{
                listStyleType: "none",
                display: "flex",
              }}
            >
              <Reservation></Reservation>
              <Filter></Filter>
            </div>
            <div> bbbádaaa</div>
          </div>
        </div>
        <div
          style={{
            height: "72px",
            background: "hsl(180, 9%, 98%)",
            display: "block",
            // top: 0,
            width: "100%",
            // zIndex: 20, // ghi lên khi cuộn
          }}
        >
          ádsdsssss
        </div>
        <div style={{ display: "flex" }}>
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
