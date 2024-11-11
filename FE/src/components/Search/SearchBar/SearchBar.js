import React, { useState } from "react";
import SearchBox from "../../Search/SearchBar/Search";
import Logo from "../../Logo";
import HeaderInfo from "../../../features/UserInfo/components/HeaderInfo";
const SearchBar = ({ border }) => {
  return (
    <>
      <div
        style={{
          background: "white",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          padding: "10px",
        }}
      >
        <div
          style={{
            paddingRight: "10px",
          }}
        >
          <Logo></Logo>
        </div>
        <SearchBox border={border} />
        <HeaderInfo
          userName="Nhựt"
          avatar={require("../../../assets/images/avatar.png")}
        />
      </div>
    </>
  );
};

export default SearchBar;
