import React, { useState, useEffect } from "react";
import List from "../../components/List/List";
import Map from "../../components/Map/Map";
import Reservation from "../../components/Dropdown/Reservation";
import Filter from "../../components/Filter/Filter";
import ResultSearch from "../../components/Search/Result/ResultSearch";
import SearchBar from "../../components/Search/SearchBar/SearchBar";
const Search = () => {
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
      <SearchBar></SearchBar>
      <div
        style={{
          height: "68px",
          background: "white",
          borderBottom: "1px solid #eaeaea",
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
            <Reservation />
            <Filter />
          </div>
          <div>bbbádaaa</div>
        </div>
      </div>
      <ResultSearch></ResultSearch>

      <div style={{ display: "flex", flexDirection: "row" }}>
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
        <Map
          setPlaces={setPlaces}
          setCoords={setCoords}
          setChildClicked={setChildClicked}
        />
      </div>
    </>
  );
};

export default Search;
