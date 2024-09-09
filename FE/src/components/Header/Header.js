import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div
      style={{
        paddingRight: "0.5rem",
        display: "block",
        paddingRight: "10px",
      }}
    >
      <div className="header_style">
        <span style={{ cursor: "pointer" }}>
          <span
            className="text_header"
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Register my restaurant
          </span>
        </span>
        <div className="line_header">
          <hr
            style={{
              height: "15px",
              margin: " 0.5rem",
              borderLeft: "1px solid rgb(213, 216, 220)",
            }}
          ></hr>
        </div>{" "}
        <span style={{ cursor: "pointer" }}>
          <span
            className="text_header"
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Help
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
