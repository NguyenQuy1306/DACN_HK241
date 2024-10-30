import React, { useState } from "react";
import "./FilterComment.css";
import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import DropdownOption from "../DropdownOption/DropdownOption";
const FilterComment = ({ selectedPlace, text }) => {
  const [onChooseOption1, setOnChooseOption1] = useState(true);
  const [onChooseOption2, setOnChooseOption2] = useState(false);
  const [onChooseOption3, setOnChooseOption3] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleOpenFilter = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <div className="FilterCommentDiv">
      <div className="FilterCommentDiv_H1">
        <fieldset className="FilterCommentDiv_H1_fildset">
          <Button
            className="FilterCommentDiv_H1_fildset_button"
            onClick={handleOpenFilter}
          >
            <span className="FilterCommentDiv_H1_fildset_button_span1">
              <div className="FilterCommentDiv_H1_fildset_button_span1_div">
                <SortIcon></SortIcon>
                <span>Mới nhất</span>
              </div>
            </span>
          </Button>
          {openDropdown && (
            <div className="FilterCommentDiv_H1_fildset_dropdown">
              <div className="FilterCommentDiv_H1_fildset_dropdown_name">
                <span className="FilterCommentDiv_H1_fildset_dropdown_name_span">
                  <span>Sort</span>
                </span>
              </div>
              <DropdownOption
                text={"Mới nhất"}
                setOnChooseOption1={setOnChooseOption1}
                setOnChooseOption2={setOnChooseOption2}
                setOnChooseOption3={setOnChooseOption3}
                choosedOption={onChooseOption1}
              ></DropdownOption>
              <DropdownOption
                text={"Rating cao nhất"}
                setOnChooseOption1={setOnChooseOption1}
                setOnChooseOption2={setOnChooseOption2}
                setOnChooseOption3={setOnChooseOption3}
                choosedOption={onChooseOption2}
              ></DropdownOption>
              <DropdownOption
                text={"Rating thấp nhất"}
                setOnChooseOption1={setOnChooseOption1}
                setOnChooseOption2={setOnChooseOption2}
                setOnChooseOption3={setOnChooseOption3}
                choosedOption={onChooseOption3}
              ></DropdownOption>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
};

export default FilterComment;
