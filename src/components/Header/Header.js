import React from "react";
import "./Header.css";

const Header = ({ onPlaceChanged, onLoad }) => {
  return (
    <div
      style={{
        paddingRight: "0.5rem",
        display: "block",
        marginTop: "-px",
        paddingRight: "10px",
      }}
    >
      <div className="header_style">
        <span style={{ cursor: "pointer" }}>
          <span
            style={{
              position: "relative",
              border: "0",
              textTransform: "uppercase",
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              verticalAlign: "bottom",
              fontSize: "0.8125rem",
              fontWeight: "500",
              fontFamily: "RalewayX, arial, sans-serif",
              fontStyle: "normal",
              boxShadow: "none",
              color: "hsl(174, 100%, 20%)",
              backgroundColor: "transparent",
              padding: "0 0.25rem",
              borderRadius: "0",
              height: "unset",
              lineHeight: "unset",
            }}
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
        {/* The line separator */}
        <span style={{ cursor: "pointer" }}>
          <span
            style={{
              position: "relative",
              border: "0",
              textTransform: "uppercase",
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              verticalAlign: "bottom",
              fontSize: "0.8125rem",
              fontWeight: "500",
              fontFamily: "RalewayX, arial, sans-serif",
              fontStyle: "normal",
              boxShadow: "none",
              color: "hsl(174, 100%, 20%)",
              backgroundColor: "transparent",
              padding: "0 0.25rem",
              borderRadius: "0",
              height: "unset",
              lineHeight: "unset",
            }}
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
