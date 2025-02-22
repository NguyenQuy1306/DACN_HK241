import React, { useState } from "react";
import SearchBox from "../../Search/SearchBar/Search";
import Logo from "../../Logo";
import HeaderInfo from "../../../features/UserInfo/components/HeaderInfo";
import Authentication from "../../../features/Authentication/Authentication";
import { useSelector, useDispatch } from "react-redux";
import { setStatusModalAuthentication } from "../../../redux/features/authenticationSlice";
const SearchBar = ({ border }) => {
  const dispatch = useDispatch();
  const showDrawer = () => {
    dispatch(setStatusModalAuthentication({ openModal: true }));
    // document.body.style.overflow = "hidden";
  };
  const open = useSelector((state) => state.authentication.openModal);

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
        <div
          onClick={showDrawer}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: 0,
            paddingRight: "5px",
          }}
        >
          <HeaderInfo
            userName="Nhựt"
            avatar={require("../../../assets/images/avatar.png")}
          />
        </div>
        <Authentication open={open}></Authentication>
      </div>
    </>
  );
};

export default SearchBar;
