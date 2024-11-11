import React, { useState } from "react";
import SearchBox from "../../Search/SearchBar/Search";
import Logo from "../../Logo";
import HeaderInfo from "../../../features/UserInfo/components/HeaderInfo";
import ModalHomepage from "../../Modal/ModalHomepage/ModalHomepage";
const SearchBar = ({ border }) => {
  const showDrawer = () => {
    setOpen(true);
    // document.body.style.overflow = "hidden";
  };
  const [open, setOpen] = useState(false);

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
        <ModalHomepage open={open} setOpen={setOpen}></ModalHomepage>
      </div>
    </>
  );
};

export default SearchBar;
