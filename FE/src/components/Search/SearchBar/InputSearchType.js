import React, { useState, useMemo, useTransition, useCallback } from "react";
import TextField from "@mui/material/TextField";
import ModalSearch from "../../Modal/ModalSearch/ModalSearch";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  searchKeyword,
  saveKeyword,
  searchWithKeyword,
  handleModal,
  openModalSearch2,
} from "../../../redux/features/searchSlice";
import "./InputSearch.css";

const InputSearchType = ({ width, placeholder, iCon, setValue }) => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const openOf2 = useSelector(openModalSearch2);
  const [inputValue, setInputValue] = useState("");

  const fetchKeywordImmediate = useCallback(
    debounce((query) => {
      if (!query) return;
      try {
        dispatch(saveKeyword(query));
        startTransition(() => {
          dispatch(
            searchWithKeyword({
              param: query,
              lon: 106.6983125,
              lat: 10.7802256,
            })
          );
        });
        setValue(query);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    }, 0), // 🔥 Executes immediately
    [dispatch, setValue]
  );

  // ✅ Delayed debounce (500ms)
  const fetchKeywordDelayed = useCallback(
    debounce((query) => {
      if (!query) return;
      try {
        dispatch(saveKeyword(query));
        startTransition(() => {
          dispatch(searchKeyword({ param: query }));
        });
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    }, 500), // 🔥 Executes after 500ms
    [dispatch]
  );

  const handleOnChangeSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchKeywordImmediate(value);
    fetchKeywordDelayed(value);
  };

  // ✅ Handle Input Click (Open Modal)
  const handleInputClick = () => {
    dispatch(handleModal({ openModalSearch2: true }));
  };

  return (
    <div className={`InputSearchDiv ${openOf2 ? "active" : ""}`}>
      {openOf2 && (
        <div className="modalSearch_dropdown">
          <ModalSearch />
        </div>
      )}
      <TextField
        sx={{ width }}
        onClick={handleInputClick}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleOnChangeSearch}
        InputProps={{
          startAdornment: iCon,
          style: { border: "none", height: "37px" },
        }}
      />
    </div>
  );
};

export default InputSearchType;
