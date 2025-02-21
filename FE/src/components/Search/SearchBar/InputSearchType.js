import * as React from "react";
import TextField from "@mui/material/TextField";
import ModalSearch from "../../Modal/ModalSearch/ModalSearch";
import debounce from "lodash.debounce";
import {
  searchKeyword,
  saveKeyword,
  searchWithKeyword,
} from "../../../redux/features/searchSlice";
import {
  handleModal,
  openModalSearch2,
} from "../../../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import "./InputSearch.css";

const InputSearchType = ({ width, placeholder, iCon, getOpen, setValue }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const openOf2 = useSelector(openModalSearch2);

  const fetchKeyword = debounce(async (query) => {
    if (!query) return;
    try {
      dispatch(searchKeyword({ param: query }));
      dispatch(saveKeyword(query));
      dispatch(
        searchWithKeyword({
          param: query,
          // lon: myCoords.longitude,
          // lat: myCoords.latitude,
          lon: 106.6983125,
          lat: 10.7802256,
        })
      );
      setValue(query);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  }, 300);

  React.useEffect(() => {
    fetchKeyword(inputValue);
  }, [inputValue]);

  const handleInputClick = () => {
    dispatch(handleModal({ openModalSearch2: true }));
    if (placeholder === "Bạn muốn đặt chỗ đến đâu") {
      getOpen(true);
    }
  };
  const handleOnChangeSearch = (e) => {
    setInputValue(e.target.value);
    dispatch(
      searchWithKeyword({
        param: e.target.value,
        // lon: myCoords.longitude,
        // lat: myCoords.latitude,
        lon: 106.6983125,
        lat: 10.7802256,
      })
    );
  };
  return (
    <div className={`InputSearchDiv ${openOf2 ? "active" : ""}`}>
      {openOf2 && placeholder === "Bạn muốn đặt chỗ đến đâu" && (
        <div className="modalSearch_dropdown">
          <ModalSearch />
        </div>
      )}
      <TextField
        sx={{ width }}
        onClick={handleInputClick}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => handleOnChangeSearch(e)}
        InputProps={{
          startAdornment: iCon,
          style: { border: "none", height: "37px" },
        }}
      />
    </div>
  );
};

export default InputSearchType;
