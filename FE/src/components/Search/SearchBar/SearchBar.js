import React, { useState } from "react";
import SearchBox from "../../Search/SearchBar/Search";
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
                <SearchBox border={border} />
            </div>
        </>
    );
};

export default SearchBar;
