import React, { useState } from "react";
import SearchBox from "../../Search/SearchBar/Search";
const SearchBar = () => {
  return (
    <>
      <div
        style={{
          height: "72px",
          background: "white",
          width: "100%",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "165px",
          }}
        >
          logooooooo
        </div>
        <SearchBox />
        <div
          style={{
            width: "131px",
          }}
        >
          profile
        </div>
      </div>
    </>
  );
};

export default SearchBar;
