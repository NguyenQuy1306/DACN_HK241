import React, { useState } from "react";
import "antd/dist/reset.css";
import InputSearch from "./InputSearch";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ border = "1px solid rgb(213, 216, 220)" }) => {
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");
    const navigate = useNavigate();
    const handleSearch1Change = (value) => {
        setSearch1(value);
    };

    const handleSearch2Change = (value) => {
        setSearch2(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior (page refresh)
        console.log("Search 1:", search1);
        console.log("Search 2:", search2);
        // Implement your search logic here
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "row",
                borderRadius: "12px",
                width: "850px",
                alignItems: "center",
                background: "rgb(255, 255, 255)",
                border: border === "none" ? "none" : border,
                boxShadow: "none",
                gap: "0.375rem",
                height: "2.88rem",
            }}
        >
            <InputSearch
                value={search1}
                onChange={handleSearch1Change}
                width={276}
                placeholder={"Cuisine"}
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
            <InputSearch
                value={search2}
                onChange={handleSearch2Change}
                width={430}
                placeholder={"Restaurant"}
                iCon={<SearchIcon></SearchIcon>}
            />

            <button
                type="submit"
                className="search-btn"
                onClick={() => navigate("../Search")}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBox;
