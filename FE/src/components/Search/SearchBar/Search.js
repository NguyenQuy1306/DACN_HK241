import React, { useState } from "react";
import "antd/dist/reset.css";
import InputSearch from "./InputSearch";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import {
  handleModal,
  handleModal1,
  openModalSearch2,
  searchWithKeyword,
} from "../../../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import InputSearchType from "./InputSearchType";
import { saveParamKeywordSearch } from "../../../redux/features/searchSlice";
const SearchBox = ({ border = "1px solid rgb(213, 216, 220)" }) => {
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSearch1Change = (value) => {
    setSearch1(value);
  };
  const dispatch = useDispatch();
  const handleSearch2Change = (value) => {
    setSearch2(value);
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const open = useSelector(openModalSearch2);

  const handleOnCloseSearch2 = () => {
    dispatch(handleModal({ openModalSearch2: false }));
  };
  const handleClickSearch = () => {
    if (inputValue == "") {
      navigate(`../Search`);
      return;
    }
    navigate(`../SearchResult/${inputValue}`);
    dispatch(saveParamKeywordSearch(inputValue));
    dispatch(handleModal({ openModalSearch2: false }));
    dispatch(
      searchWithKeyword({
        param: inputValue,
        // lon: myCoords.longitude,
        // lat: myCoords.latitude,
        lon: 106.6983125,
        lat: 10.7802256,
      })
    );
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "row",
        borderRadius: "8px",
        width: "900px",
        alignItems: "center",
        background: "rgb(255, 255, 255)",
        border: border === "none" ? "none" : border,
        boxShadow: "none",
        gap: "0.375rem",
        height: "2.88rem",
      }}
    >
      {/* <CustomDropdown options={options} placeholder="Select an option" /> */}
      {open && <div className="overlay" onClick={handleOnCloseSearch2}></div>}
      <InputSearch
        value={search1}
        onChange={handleSearch1Change}
        width={200}
        placeholder={"Khu vực"}
        iCon={<LocationOnIcon></LocationOnIcon>}
      />
      <div>
        <hr
          style={{
            alignSelf: "normal",
            border: "none",
            height: "46px",
            marginBlock: "-0.375rem",
            borderLeft: "1px solid hsl(214, 9%, 85%)",
          }}
        ></hr>
      </div>
      <div className="InputSearch2Div">
        <InputSearchType
          value={search2}
          onChange={handleSearch2Change}
          width={560}
          placeholder={"Bạn muốn đặt chỗ đến đâu"}
          iCon={<SearchIcon></SearchIcon>}
          setValue={setInputValue}
        />

        <button
          type="submit"
          className="search-btn"
          onClick={() => handleClickSearch()}
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
