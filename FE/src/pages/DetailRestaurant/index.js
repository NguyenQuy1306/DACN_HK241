import React, { useState, useEffect } from "react";
import SearchBar from "../../components/Search/SearchBar/SearchBar";
import Result1 from "../../components/Search/Result/Result1";
import ListImage from "../../components/Detail/Image/ImageBox";
import DetailBox from "../../components/Detail/DetailBox/DetailBox";
// import { useDispatch, useSelector } from "react-redux";

const DetailRestaurant = () => {
  const [selectedPlace, setSelectedPlace] = useState(
    JSON.parse(localStorage.getItem("selectedPlace"))
  );
  return (
    <>
      <SearchBar></SearchBar>
      <Result1></Result1>
      <ListImage></ListImage>
      <DetailBox selectedPlace={selectedPlace}></DetailBox>
    </>
  );
};

export default DetailRestaurant;
