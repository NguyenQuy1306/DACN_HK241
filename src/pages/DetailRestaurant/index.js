import React, { useState, useEffect } from "react";
import SearchBar from "../../components/Search/SearchBar/SearchBar";
import Result1 from "../../components/Search/Result/Result1";
import ListImage from "../../components/Detail/Image/ImageBox";
const DetailRestaurant = () => {
  return (
    <>
      <SearchBar></SearchBar>
      <Result1></Result1>
      <ListImage></ListImage>
    </>
  );
};

export default DetailRestaurant;
